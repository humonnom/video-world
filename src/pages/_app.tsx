import Layout from '@/components/layout';
import { AuthProvider } from '@/provider/AuthProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const dehydratedState = pageProps.dehydratedState;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <ToastContainer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </AuthProvider>
  );
}
