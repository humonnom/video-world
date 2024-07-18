import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from '@/pages/login';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { SignInError } from '@/constants/errors';
import { Routes } from '@/constants/routes';
import mockRouter from 'next-router-mock';

jest.mock('../../src/hooks/useAuth');
jest.mock('react-toastify');
mockRouter.push = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
    });
    toast.success = jest.fn();
    toast.error = jest.fn();
  });

  it('renders the login form', () => {
    render(<Login />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '로그인하기' })
    ).toBeInTheDocument();
  });

  it('displays error messages for invalid form inputs', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

    expect(
      screen.getAllByText('해당 필드는 필수 입력 항목입니다.')
    ).toHaveLength(2);
  });

  it('calls the login function and redirects on successful login', async () => {
    const login = jest.fn();
    useAuth.mockReturnValue({ login });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));
    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      })
    );
    expect(toast.success).toHaveBeenCalledWith('로그인 성공');
    expect(mockRouter.push).toHaveBeenCalledWith(Routes.HOME);
  });

  it('displays an error toast for user not found', async () => {
    const login = jest.fn(() => {
      throw SignInError.NOT_FOUND;
    });
    useAuth.mockReturnValue({ login });
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));
    await waitFor(() => expect(login).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith('사용자를 찾을 수 없습니다.');
  });

  it('displays an error toast for incorrect password', async () => {
    const login = jest.fn(() => {
      throw SignInError.PASSWORD_INCORRECT;
    });
    useAuth.mockReturnValue({ login });
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));
    await waitFor(() => expect(login).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.');
  });
});
