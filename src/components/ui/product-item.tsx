import { ProductWithTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex max-w-[156px] flex-col gap-4">
      <div className="relative flex h-[180px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2">
            <ArrowDownIcon size={16} /> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>
        {product.discountPercentage > 0 ? (
          <div className="flex items-center gap-2">
            <p className="font-semibold">
              {" "}
              R$
              {Number(product.totalPrice) >= 1000
                ? product.totalPrice
                : product.totalPrice.toFixed(2)}
            </p>
            <p className="text-xs line-through opacity-75">
              R$ {Number(product.basePrice).toFixed(2)}
            </p>
          </div>
        ) : (
          <p className="font-semibold">
            R$ {Number(product.basePrice).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
