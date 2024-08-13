"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalQuantity: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalQuantity: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@valeryianstore/cart-products") || "[]"),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "@valeryianstore/cart-products",
      JSON.stringify(products),
    );
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce(
      (accumulator, product) =>
        accumulator + Number(product.basePrice) * product.quantity,
      0,
    );
  }, [products]);

  const total = useMemo(() => {
    return products.reduce(
      (accumulator, product) =>
        accumulator + product.totalPrice * product.quantity,
      0,
    );
  }, [products]);

  const totalDiscount = subTotal - total;

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

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevState) =>
      prevState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        }
        return cartProduct;
      }),
    );

    setCartTotalQuantity((prevState) => prevState + 1);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevState) =>
      prevState
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );

    setCartTotalQuantity((prevState) => prevState - 1);
  };

  const removeProductFromCart = (productId: string) => {
    const product: CartProduct | undefined = products.find(
      (cartProduct) => cartProduct.id === productId,
    );

    if (product) {
      setCartTotalQuantity((prevState) => prevState - product.quantity);

      setProducts((prevState) =>
        prevState.filter((cartProduct) => cartProduct.id !== productId),
      );
    } else {
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalQuantity,
        total,
        subTotal,
        totalDiscount,
        addProductToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
