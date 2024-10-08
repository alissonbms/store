"use client";

import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between pr-3">
      <div className="flex items-center gap-3">
        <div className="flex min-h-[5.625rem] w-[77px] items-center justify-center bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col">
          <p className="truncate text-xs"> {product.name}</p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <p className="text-sm font-bold">
              {parseFloat(product.totalPrice.toFixed(2)).toLocaleString(
                "pt-BR",
                {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                },
              )}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {parseFloat(
                  Number(product.basePrice).toFixed(2),
                ).toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                })}{" "}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Button
              size="icon"
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleDecreaseQuantityClick}
            >
              <Minus size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              size="icon"
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleIncreaseQuantityClick}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant={"outline"}
        size="icon"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
