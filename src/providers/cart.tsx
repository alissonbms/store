"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartBasePrice: number;
  cartTotalPrice: number;
  cartTotalDiscount: number;
  cartTotalQuantity: number;
  addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalPrice: 0,
  cartTotalDiscount: 0,
  cartTotalQuantity: 0,
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);

  const addProductToCart = (product: CartProduct) => {
    setProducts((prevState) => [...prevState, product]);
    setCartTotalQuantity((prevState) => prevState + product.quantity);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartBasePrice: 0,
        cartTotalPrice: 0,
        cartTotalDiscount: 0,
        cartTotalQuantity,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
