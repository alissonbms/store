"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleAddProductToCartClick = (product: CartProduct) => {
    addProductToCart(product);
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>{" "}
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <div className="flex gap-1 text-sm opacity-75">
          De:{" "}
          <p className="line-through">
            R$ {Number(product.basePrice).toFixed(2)}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant={"outline"}
          onClick={() =>
            setQuantity((prevState) => (prevState === 1 ? 1 : prevState - 1))
          }
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant={"outline"}>
          <ArrowRightIcon
            size={16}
            onClick={() => setQuantity((prevState) => prevState + 1)}
          />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição:</h3>
        <p className="text-justify text-sm opacity-65">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={() => handleAddProductToCartClick({ ...product, quantity })}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Entega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-sm text-primary">
              Envio para
              <span className="font-bold"> todo o Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-sm font-bold">Frete Grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
