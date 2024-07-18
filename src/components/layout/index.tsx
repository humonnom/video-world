import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Routes } from '@/constants/routes';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { logout, loggedInUser } = useContext(AuthContext);
  const router = useRouter();

  const handleClickLogout = () => {
    logout();
    router.push(Routes.HOME);
    toast.success('로그아웃 되었습니다.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <nav className="flex justify-between items-center">
          <Link href="/">Video World</Link>
          <div className="m-3 flex space-x-4">
            {loggedInUser ? (
              <>
                <Link href={Routes.PROFILE}>My page</Link>
                <button onClick={handleClickLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link href={Routes.LOGIN}>Login</Link>
                <Link href={Routes.SIGN_UP}>Join</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 xl:px-0 py-6">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} </p>
      </footer>
    </div>
  );
};

export default Layout;
