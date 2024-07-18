import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Profile from '@/pages/profile';
import useAuth from '@/hooks/useAuth';
import { AuthContext } from '@/provider/AuthProvider';
import { toast } from 'react-toastify';
import { ProfileUpdateError } from '@/constants/errors';
import { CATEGORY_OPTIONS, JOB_OPTIONS } from '../../src/constants/options';

jest.mock('../../src/hooks/useAuth');
jest.mock('react-toastify');

describe('Profile', () => {
  const loggedInUser = {
    email: 'test@example.com',
    birthDate: '1990-01-01',
    job: 'developer',
    categories: ['programming', 'data'],
  };

  beforeEach(() => {
    useAuth.mockReturnValue({
      update: jest.fn(),
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
  });

  it('renders user information when not editing', () => {
    render(
      <AuthContext.Provider value={{ loggedInUser, updateSession: jest.fn() }}>
        <Profile />
      </AuthContext.Provider>
    );

    expect(screen.getByText('마이페이지')).toBeInTheDocument();
    expect(screen.getByText(loggedInUser.email)).toBeInTheDocument();
    expect(screen.getByText(loggedInUser.birthDate)).toBeInTheDocument();
    expect(
      screen.getByText(
        JOB_OPTIONS.find((option) => option.value === loggedInUser.job)?.label
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        loggedInUser.categories
          .map(
            (category) =>
              CATEGORY_OPTIONS.find((option) => option.value === category)
                ?.label
          )
          .join(', ')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '내 정보 수정하기' })
    ).toBeInTheDocument();
  });

  it('renders edit form when editing', () => {
    render(
      <AuthContext.Provider value={{ loggedInUser, updateSession: jest.fn() }}>
        <Profile />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: '내 정보 수정하기' }));

    expect(screen.getByPlaceholderText('현재 비밀번호')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('새로운 비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('생년월일 변경')).toBeInTheDocument();
    expect(screen.getByLabelText('직업 변경')).toBeInTheDocument();
    expect(screen.getByText('관심 카테고리 변경')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: '취소하기' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '수정하기' })
    ).toBeInTheDocument();
  });

  it('calls update function and displays success toast on successful update', async () => {
    const update = jest.fn();
    useAuth.mockReturnValue({ update });

    render(
      <AuthContext.Provider value={{ loggedInUser, updateSession: jest.fn() }}>
        <Profile />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: '내 정보 수정하기' }));

    fireEvent.change(screen.getByPlaceholderText('현재 비밀번호'), {
      target: { value: 'CurrentPassword123!' },
    });
    fireEvent.change(screen.getByLabelText('생년월일 변경'), {
      target: { value: '1995-01-01' },
    });

    fireEvent.click(screen.getByRole('button', { name: '수정하기' }));

    await waitFor(() =>
      expect(update).toHaveBeenCalledWith({
        job: loggedInUser.job,
        categories: loggedInUser.categories,
        birthDate: '1995-01-01',
        password: 'CurrentPassword123!',
        newPassword: '',
      })
    );
    expect(toast.success).toHaveBeenCalledWith('프로필 수정 성공');
  });

  it('displays error toast for user not found', async () => {
    const update = jest.fn(() => {
      throw ProfileUpdateError.NOT_FOUND;
    });
    useAuth.mockReturnValue({ update });

    render(
      <AuthContext.Provider value={{ loggedInUser, updateSession: jest.fn() }}>
        <Profile />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: '내 정보 수정하기' }));
    fireEvent.change(screen.getByPlaceholderText('현재 비밀번호'), {
      target: { value: 'CurrentPassword123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: '수정하기' }));

    await waitFor(() => expect(update).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith('사용자를 찾을 수 없습니다.');
  });

  it('displays error toast for incorrect password', async () => {
    const update = jest.fn(() => {
      throw ProfileUpdateError.PASSWORD_INCORRECT;
    });
    useAuth.mockReturnValue({ update });

    render(
      <AuthContext.Provider value={{ loggedInUser, updateSession: jest.fn() }}>
        <Profile />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: '내 정보 수정하기' }));
    fireEvent.change(screen.getByPlaceholderText('현재 비밀번호'), {
      target: { value: 'CurrentPassword123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: '수정하기' }));

    await waitFor(() => expect(update).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.');
  });
});
