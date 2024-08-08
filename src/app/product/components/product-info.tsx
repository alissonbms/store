"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "name" | "description" | "discountPercentage" | "totalPrice"
  >;
}

const ProductInfo = ({
  product: { basePrice, name, description, discountPercentage, totalPrice },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((prevState) => (prevState === 1 ? 1 : prevState - 1));
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>{" "}
        {discountPercentage > 0 && (
          <Badge>
            <ArrowDownIcon size={16} /> {discountPercentage}%
          </Badge>
        )}
      </div>

      {discountPercentage > 0 && (
        <div className="flex gap-1 text-sm opacity-75">
          De: <p className="line-through">R$ {Number(basePrice).toFixed(2)}</p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant={"outline"}
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button size="icon" variant={"outline"}>
          <ArrowRightIcon size={16} onClick={handleIncreaseQuantityClick} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição:</h3>
        <p className="text-justify text-sm opacity-65">{description}</p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-3">
          <TruckIcon />
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              Entega via <span className="font-bold">ValPacket®</span>
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
