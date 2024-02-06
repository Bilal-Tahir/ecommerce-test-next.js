import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isMainPage = router.pathname === '/';

  return (
    <div
      className='flex flex-col min-h-screen'
      style={{ backgroundColor: '#f2f5fa' }}
    >
      <Navbar />
      {isMainPage && <Hero />}
      <main className='container mx-auto p-4 flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
