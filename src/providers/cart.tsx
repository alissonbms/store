"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
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
    const isProductAlreadyOnCart = products.some(
      (cartProdut) => cartProdut.id === product.id,
    );

    if (isProductAlreadyOnCart) {
      setProducts((prevState) =>
        prevState.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
    } else {
      setProducts((prevState) => [...prevState, product]);
    }

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
