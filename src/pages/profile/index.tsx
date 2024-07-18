import Form from '@/components/form';
import { EditableUserInfo } from '@/types/user';
import { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '@/provider/AuthProvider';
import { array, string } from '@/utils/schema';
import { password } from '@/utils/schema/regex';
import { CATEGORY_OPTIONS, JOB_OPTIONS } from '@/constants/options';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { ProfileUpdateError } from '@/constants/errors';
import { match } from 'ts-pattern';
import Label from '@/components/label';
import FormInput from '@/components/form-input';

const schema = {
  password: string().required().min(8).matches(password, {
    message: '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.',
  }),
  newPassword: string()
    .min(8)
    .matches(password, {
      message: '비밀번호는 영문자, 숫자, 특수문자를 포함해야 합니다.',
    })
    .optional(),
  birthDate: string().optional(),
  job: string().optional(),
  categories: array(string()).optional(),
};

function Profile() {
  const { loggedInUser, updateSession } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<Partial<EditableUserInfo>>({});
  const { update } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      setInitialData({
        newPassword: '',
        password: '',
        birthDate: loggedInUser.birthDate,
        job: loggedInUser.job,
        categories: loggedInUser.categories,
      });
    }
  }, [loggedInUser]);

  const handleSubmit = async (values: Partial<EditableUserInfo>) => {
    const updatedUser = {
      ...values,
      birthDate: values.birthDate
        ? format(new Date(values.birthDate), 'yyyy-MM-dd')
        : loggedInUser?.birthDate,
    };

    try {
      await update(updatedUser);
      toast.success('프로필 수정 성공');
      setIsEditing(false);
    } catch (error) {
      const e = error as ProfileUpdateError;
      match(e)
        .with(ProfileUpdateError.NOT_FOUND, () => {
          toast.error('사용자를 찾을 수 없습니다.');
        })
        .with(ProfileUpdateError.PASSWORD_INCORRECT, () => {
          toast.error('비밀번호가 일치하지 않습니다.');
        })
        .exhaustive();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
      {!isEditing && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <Label>이메일</Label>
          <p className="text-gray-600 mb-2">{loggedInUser?.email}</p>
          <Label>생년월일</Label>
          <p className="text-gray-600 mb-2">{loggedInUser?.birthDate}</p>
          <Label>직업</Label>
          <p className="text-gray-600 mb-2">
            {
              JOB_OPTIONS.find((option) => option.value === loggedInUser?.job)
                ?.label
            }
          </p>
          <Label>관심 카테고리</Label>
          <p className="text-gray-600 mb-2">
            {loggedInUser?.categories
              .map(
                (category) =>
                  CATEGORY_OPTIONS.find((option) => option.value === category)
                    ?.label
              )
              .join(', ')}
          </p>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            내 정보 수정하기
          </button>
        </div>
      )}
      {isEditing && (
        <Form
          id={'profile'}
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialData={initialData}
        >
          {(props) => {
            return (
              <>
                <FormInput
                  label="이메일"
                  value={loggedInUser?.email}
                  readOnly
                />
                <FormInput
                  label={'현재 비밀번호 입력'}
                  id={'password'}
                  type={'password'}
                  name={'password'}
                  placeholder={'현재 비밀번호'}
                  value={props.values.password}
                  onChange={props.handleChange}
                  required
                  error={props.errors.password}
                />
                <FormInput
                  label={'새로운 비밀번호 입력'}
                  id={'newPassword'}
                  type={'password'}
                  name={'newPassword'}
                  placeholder={'새로운 비밀번호'}
                  value={props.values.newPassword}
                  onChange={props.handleChange}
                  error={props.errors.newPassword}
                />
                <FormInput
                  id={'birthDate'}
                  name={'birthDate'}
                  label={'생년월일 변경'}
                  value={props.values.birthDate}
                  error={props.errors.birthDate}
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  onChange={props.handleChange}
                />
                <FormInput
                  id={'job'}
                  label={'직업 변경'}
                  error={props.errors.job}
                  customInput={() => (
                    <select
                      id={'job'}
                      name={'job'}
                      value={props.values.job}
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
                  label={'관심 카테고리 변경'}
                  error={props.errors.categories}
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    취소하기
                  </button>
                  <button
                    type={'submit'}
                    form={props.id}
                    disabled={!props.isValid}
                    style={{ opacity: props.isValid ? 1 : 0.5 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    수정하기
                  </button>
                </div>
              </>
            );
          }}
        </Form>
      )}
    </div>
  );
}

export default Profile;
