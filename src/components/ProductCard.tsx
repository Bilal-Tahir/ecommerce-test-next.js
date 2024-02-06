import Link from 'next/link';
import Image from 'next/image';
import { ProductProps } from '@/types';

interface ProductCardProps {
  product: ProductProps;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className='border p-4 mb-8 overflow-hidden bg-white text-center text-black h-full transform relative group hover:border-black focus:border-black border-2 transition-transform group-hover:scale-105 group-focus:scale-105'>
        <div className='relative w-32 h-32 mb-4 mx-auto transition-transform transform group-hover:scale-105 group-focus:scale-105'>
          <Image
            src={product.image}
            alt={product.title}
            layout='fill'
            objectFit='cover'
            className='rounded-md'
          />
        </div>

        <div className='flex flex-col h-full justify-between'>
          <div>
            <h3 className='text-sm font-semibold mb-1 overflow-hidden overflow-ellipsis'>
              {product.title}
            </h3>
            <p className='text-black'>${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
