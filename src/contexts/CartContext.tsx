import React, { createContext, useContext, useMemo, useState } from 'react';
import { Products } from '../interfaces';

interface CartProductsProps {
  product: Products,
  quantity: number
}

interface CartContextProps {
  products: CartProductsProps[];
  setProducts: (data: CartProductsProps[]) => void;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<CartProductsProps[]>([]);
  // const value = useMemo(() => { return { products, setProducts } }, [products, setProducts]);

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider >
  );
}

export function useCart() {
  const context = useContext<CartContextProps>(CartContext);
  if (!context) throw new Error("Error: No context found!");
  return context;
}