import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className='bg-gray-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <Link href='/'>
            <h1 className='text-lg font-semibold'>E-Commerce Shop</h1>
          </Link>
        </div>
        <div className='flex items-center'>
          <Link href='/cart'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-6 w-6 inline-block mr-1'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 3a9 9 0 016.497 14.366l5.536 5.536-1.414 1.414-5.536-5.536A9 9 0 113 9'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 10a3 3 0 100-6 3 3 0 000 6z'
              />
            </svg>
            Cart ({cart ? cart.length : 0})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
