import { useRouter } from 'next/router';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '@/utils/fetchProducts';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductProps } from '@/types';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const foundProduct = fetchedProducts.find(
          (p: ProductProps) => p.id.toString() === slug
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found');
        }

        // Set the products array here
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handleHoverStart = () => {
    controls.start({ scale: 1.2 });
  };

  const handleHoverEnd = () => {
    controls.start({ scale: 1 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    const boundingRect = imageContainer.getBoundingClientRect();

    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;

    const percentX = (x / boundingRect.width) * 100;
    const percentY = (y / boundingRect.height) * 100;

    imageContainer.style.setProperty('--x', `${percentX}%`);
    imageContainer.style.setProperty('--y', `${percentY}%`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  // Find the index of the current product in the list of products
  const currentIndex = products.findIndex((p) => p.id.toString() === slug);

  // Calculate the indices of the next and previous products
  const nextIndex = (currentIndex + 1) % products.length;
  const prevIndex = (currentIndex - 1 + products.length) % products.length;

  // Retrieve the next and previous products
  const nextProduct = products[nextIndex];
  const prevProduct = products[prevIndex];

  return (
    <div className='container mx-auto mt-8 p-8 bg-white rounded shadow-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div
          className='relative border rounded overflow-hidden cursor-zoom-in'
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            animate={controls}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            transition={{ duration: 0.5 }}
            className='w-full h-full overflow-hidden relative'
          >
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className='w-full h-full object-cover transform origin-center transition-transform duration-500'
            />
          </motion.div>
        </div>

        <div>
          <h1 className='text-3xl font-bold mb-4'>{product.title}</h1>
          <p className='text-lg mb-2'>Price: ${product.price}</p>

          <div className='flex items-center mb-4'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => addToCart(product)}
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
            >
              Add to Cart
            </motion.button>
          </div>

          <div className='mb-4'>
            <h2 className='text-xl font-semibold mb-2'>Product Details</h2>
            <p>{product.description}</p>
          </div>

          <div className='flex flex-col md:flex-row items-start'>
            {prevProduct && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => router.push(`/product/${prevProduct.id}`)}
                className='flex items-center text-purple-500 hover:text-purple-700 px-4 py-2 rounded border border-purple-500 hover:bg-purple-500 hover:text-white mr-0 md:mr-2 md:mt-0'
              >
                <span className='mr-2'>&lt;</span>
                Previous Product
              </motion.button>
            )}

            {nextProduct && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => router.push(`/product/${nextProduct.id}`)}
                className='flex items-center text-orange-500 hover:text-orange-700 px-4 py-2 rounded border border-orange-500 hover:bg-orange-500 hover:text-white ml-0 mt-2 md:ml-2 md:mt-0'
              >
                Next Product
                <span className='ml-2'>&gt;</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
