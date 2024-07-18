import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth';
import SignUp from '@/pages/Sign-up';
import { SignUpError } from '../../src/constants/errors';

jest.mock('../../src/hooks/useAuth');
jest.mock('react-toastify');

describe('SignUp', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      signUp: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the SignUp form correctly', () => {
    render(<SignUp />);
    expect(screen.getByText('회원가입')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByText('생년월일')).toBeInTheDocument();
    expect(screen.getByText('직업')).toBeInTheDocument();
    expect(screen.getByText('관심 카테고리')).toBeInTheDocument();
    expect(screen.getByText('제출하기')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText('생년월일'), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText('직업'), {
      target: { value: 'developer' },
    });
    fireEvent.click(screen.getByLabelText('프로그래밍'));

    fireEvent.click(screen.getByText('제출하기'));

    await waitFor(() => {
      expect(useAuth().signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
        birthDate: '1990-01-01',
        job: 'developer',
        categories: ['programming'],
      });
    });
  });

  it('displays an error toast when sign up fails with duplicate email', async () => {
    const signUp = jest.fn(() => {
      throw SignUpError.DUPLICATE_EMAIL;
    });
    useAuth.mockReturnValue({ signUp });

    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText('생년월일'), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByLabelText('직업'), {
      target: { value: 'developer' },
    });
    fireEvent.click(screen.getByLabelText('프로그래밍'));
    fireEvent.click(screen.getByText('제출하기'));

    await waitFor(() => expect(signUp).toHaveBeenCalled());
    expect(toast.error).toHaveBeenCalledWith('이미 존재하는 이메일입니다.');
  });

  describe('password error', () => {
    function fillForm() {
      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByLabelText('생년월일'), {
        target: { value: '1990-01-01' },
      });
      fireEvent.change(screen.getByLabelText('직업'), {
        target: { value: 'developer' },
      });
      fireEvent.click(screen.getByLabelText('프로그래밍'));
    }

    test('Password length is less than 8', async () => {
      render(<SignUp />);
      fillForm();

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'P' },
      });
      fireEvent.click(screen.getByText('제출하기'));

      expect(
        screen.getByText('최소 8자 이상 입력해주세요.')
      ).toBeInTheDocument();
    });

    test("Password doesn't contain a number", async () => {
      render(<SignUp />);
      fillForm();

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'parkjueu*' },
      });
      fireEvent.click(screen.getByText('제출하기'));

      expect(
        screen.getByText('비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.')
      ).toBeInTheDocument();
    });

    test("Password doesn't contain alphabets", async () => {
      render(<SignUp />);
      fillForm();

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '12345678' },
      });
      fireEvent.click(screen.getByText('제출하기'));

      expect(
        screen.getByText('비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.')
      ).toBeInTheDocument();
    });

    test("Password doesn't contain special characters", async () => {
      render(<SignUp />);
      fillForm();

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'parkjueun123' },
      });
      fireEvent.click(screen.getByText('제출하기'));

      expect(
        screen.getByText('비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.')
      ).toBeInTheDocument();
    });
  });
});
