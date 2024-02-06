import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { ProductProps } from '@/types';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState<ProductProps[]>(cart);

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-2xl font-semibold mb-4'>Your Cart</h1>
      <div className='overflow-x-auto'>
        <table className='w-full table-auto'>
          <thead>
            <tr>
              <th className='py-2 px-4 border'>Product</th>
              <th className='py-2 px-4 border'>Price</th>
              <th className='py-2 px-4 border'>Quantity</th>
              <th className='py-2 px-4 border'>Total</th>
              <th className='py-2 px-4 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className='py-2 px-4 border'>
                  <div className='flex items-center'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={48}
                      height={48}
                      className='w-12 h-12 mr-2'
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className='py-2 px-4 border'>${item.price.toFixed(2)}</td>
                <td className='py-2 px-4 border'>
                  <div className='flex items-center'>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className='bg-gray-200 text-gray-600 px-2 py-1 mr-2'
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className='bg-gray-200 text-gray-600 px-2 py-1 ml-2'
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className='py-2 px-4 border'>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className='py-2 px-4 border'>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className='bg-red-500 text-white px-3 py-1'
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <h2 className='text-xl font-semibold'>
          Total: ${calculateTotal().toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
