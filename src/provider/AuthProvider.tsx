import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserInfo } from '@/types/user';

interface AuthContextData {
  loggedInUser: UserInfo | null;
  updateSession: (user: UserInfo) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
  loggedInUser: null,
  updateSession: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  };

  const logout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, logout, updateSession: init }}>
      {children}
    </AuthContext.Provider>
  );
};
