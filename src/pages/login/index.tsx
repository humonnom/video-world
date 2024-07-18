import Form from '@/components/form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { password } from '@/utils/schema/regex';
import { string } from '@/utils/schema';
import { Routes } from '@/constants/routes';
import { match } from 'ts-pattern';
import { SignInError } from '@/constants/errors';
import useAuth from '@/hooks/useAuth';
import { Credentials } from '@/services/mockUserService';
import FormInput from '@/components/form-input';

const schema = {
  password: string().required().min(8).matches(password, {
    message: '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.',
  }),
  email: string().required().email(),
};

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const handleSubmit = async (values: Credentials) => {
    try {
      await login(values);
      toast.success('로그인 성공');

      router.push(Routes.HOME);
    } catch (error) {
      const e = error as SignInError;
      match(e)
        .with(SignInError.NOT_FOUND, () => {
          toast.error('사용자를 찾을 수 없습니다.');
        })
        .with(SignInError.PASSWORD_INCORRECT, () => {
          toast.error('비밀번호가 일치하지 않습니다.');
        })
        .exhaustive();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <Form id={'login'} validationSchema={schema} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <>
              <FormInput
                id={'email'}
                name={'email'}
                label={'이메일'}
                placeholder={'이메일'}
                value={props.values.email ?? ''}
                onChange={props.handleChange}
                error={props.errors.email}
              />
              <FormInput
                id={'password'}
                name={'password'}
                label={'비밀번호'}
                placeholder={'비밀번호'}
                type={'password'}
                value={props.values.password ?? ''}
                onChange={props.handleChange}
                error={props.errors.password}
              />
              <button
                type={'submit'}
                form={'login'}
                className="w-72 bg-blue-500 text-white py-2 rounded"
              >
                로그인하기
              </button>
            </>
          );
        }}
      </Form>
    </div>
  );
}

export default Login;
