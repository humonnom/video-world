export interface User {
  email: string;
  password: string;
  birthDate: string;
  job: string;
  categories: string[];
}

export type UserInfo = Omit<User, 'password'>;

export type EditableUserInfo = Omit<User, 'email'> & {
  newPassword: string;
};
