import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout';
import { MyAppProps } from '@/types';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
