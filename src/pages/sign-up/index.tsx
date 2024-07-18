import Form from '@/components/form';
import type { User } from '@/types/user';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { array, string } from '@/utils/schema';
import { password } from '@/utils/schema/regex';
import { CATEGORY_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import useAuth from '@/hooks/useAuth';
import { SignUpError } from '@/constants/errors';
import FormInput from '@/components/form-input';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/router';

const schema = {
  email: string().required().email(),
  password: string().required().min(8).matches(password, {
    message: '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.',
  }),
  birthDate: string().required(),
  job: string().required(),
  categories: array(string()).required(),
};

function SignUp() {
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (values: User) => {
    const date = new Date(values.birthDate);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const newUser = {
      ...values,
      birthDate: formattedDate,
    };

    try {
      await signUp(newUser);
      router.push(Routes.HOME);
      toast.success('회원가입 성공');
    } catch (error) {
      const e = error as SignUpError;
      if (e === SignUpError.DUPLICATE_EMAIL) {
        toast.error('이미 존재하는 이메일입니다.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">회원가입</h1>
      <p className="text-gray-600">회원가입을 위해 아래 정보를 입력해주세요.</p>
      <Form id={'join'} validationSchema={schema} onSubmit={handleSubmit}>
        {(props) => {
          return (
            <>
              <FormInput
                id={'email'}
                label={'이메일'}
                name={'email'}
                type={'email'}
                placeholder={'이메일'}
                value={props.values.email ?? ''}
                onChange={props.handleChange}
                required
                error={props.errors.email}
              />
              <FormInput
                id={'password'}
                label={'비밀번호'}
                name={'password'}
                type={'password'}
                placeholder={'비밀번호'}
                value={props.values.password ?? ''}
                onChange={props.handleChange}
                required
                error={props.errors.password}
              />
              <FormInput
                id={'birthDate'}
                label={'생년월일'}
                name={'birthDate'}
                type={'date'}
                value={props.values.birthDate ?? ''}
                onChange={props.handleChange}
                required
                error={props.errors.birthDate}
              />
              <FormInput
                id={'job'}
                label={'직업'}
                required
                customInput={() => (
                  <select
                    id={'job'}
                    name={'job'}
                    value={props.values.job ?? ''}
                    onChange={props.handleChange}
                  >
                    <option value="">--Please choose an option--</option>
                    {JOB_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              <FormInput
                label={'관심 카테고리'}
                required
                customInput={() => (
                  <div>
                    {CATEGORY_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          multiple
                          value={option.value}
                          checked={(props.values.categories ?? []).includes(
                            option.value
                          )}
                          onChange={props.handleChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
              <button
                type={'submit'}
                form={props.id}
                disabled={!props.isValid}
                style={{ opacity: props.isValid ? 1 : 0.5 }}
                className="w-72 bg-blue-500 text-white py-2 rounded"
              >
                제출하기
              </button>
            </>
          );
        }}
      </Form>
    </div>
  );
}

export default SignUp;
