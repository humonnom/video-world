import MockUserService, { Credentials } from '@/services/mockUserService';
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { EditableUserInfo, User } from '@/types/user';

function useAuth() {
  const { updateSession } = useContext(AuthContext);

  const login = async (credentials: Credentials) => {
    const response = await MockUserService.login({
      email: credentials.email,
      password: credentials.password,
    });

    localStorage.setItem('loggedInUser', JSON.stringify(response));
    updateSession(response);
  };

  const signUp = async (user: User) => {
    const response = await MockUserService.signUp(user);

    localStorage.setItem('loggedInUser', JSON.stringify(response));
    updateSession(response);
  };

  const update = async (user: Partial<EditableUserInfo>) => {
    const response = await MockUserService.update(user);

    localStorage.setItem('loggedInUser', JSON.stringify(response));
    updateSession(response);
  };

  return {
    login,
    signUp,
    update,
  };
}

export default useAuth;
