import { ReactNode } from 'react';

export interface ProductProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, any>;
}

export interface CartContextProps {
  cart: ProductProps[];
  addToCart: (item: ProductProps) => void;
  removeFromCart: (itemId: string) => void;
}

export interface CartProviderProps {
  children: ReactNode;
}

export interface LayoutProps {
  children: ReactNode;
}
