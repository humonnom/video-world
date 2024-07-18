import { EditableUserInfo, User, UserInfo } from '@/types/user';
import {
  ProfileUpdateError,
  SignInError,
  SignUpError,
} from '@/constants/errors';
import bcrypt from 'bcryptjs';
import { omit } from '@/utils';

export interface Credentials {
  email: string;
  password: string;
}

class MockUserService {
  async login(credentials: Credentials) {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = users.find((user) => user.email === credentials.email);

    if (!user) {
      return Promise.reject(SignInError.NOT_FOUND);
    }

    const passwordMatched = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!passwordMatched) {
      return Promise.reject(SignInError.PASSWORD_INCORRECT);
    }

    const loggedInUser: UserInfo = omit(user, 'password');
    return Promise.resolve(loggedInUser);
  }

  async signUp(user: User) {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const userExists = users.some((u) => u.email === user.email);

    if (userExists) {
      return Promise.reject(SignUpError.DUPLICATE_EMAIL);
    }

    const hashedPassword = bcrypt.hashSync(user.password, process.env.SALT);

    const newUser: User = {
      ...user,
      password: hashedPassword,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return Promise.resolve(omit(newUser, 'password'));
  }

  async update(updatedUser: Partial<EditableUserInfo>) {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    ) as UserInfo;
    const userIndex = users.findIndex((u) => u.email === loggedInUser.email);

    if (userIndex === -1) {
      return Promise.reject(ProfileUpdateError.NOT_FOUND);
    }

    const user = users[userIndex];

    const passwordMatched = await bcrypt.compare(
      updatedUser?.password ?? '',
      user.password
    );

    if (!passwordMatched) {
      return Promise.reject(ProfileUpdateError.PASSWORD_INCORRECT);
    }

    let updatedPassword = user.password;
    if (updatedUser.newPassword) {
      updatedPassword = bcrypt.hashSync(
        updatedUser.newPassword,
        process.env.SALT
      );
    }

    const updatedUserData: User = {
      ...user,
      ...updatedUser,
      password: updatedPassword,
    };

    users[userIndex] = updatedUserData;
    localStorage.setItem('users', JSON.stringify(users));

    const updatedLoggedInUser: UserInfo = omit(updatedUserData, 'password');
    return Promise.resolve(updatedLoggedInUser);
  }
}

export default new MockUserService() as MockUserService;
