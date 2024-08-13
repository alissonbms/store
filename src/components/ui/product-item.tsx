import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3 px-2">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="truncate text-sm">{product.name}</p>
          {product.discountPercentage > 0 ? (
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <p className="font-semibold">
                {" "}
                {parseFloat(product.totalPrice.toFixed(2)).toLocaleString(
                  "pt-BR",
                  {
                    currency: "BRL",
                    style: "currency",
                    minimumFractionDigits: 2,
                  },
                )}{" "}
              </p>
              <p className="text-xs line-through opacity-75">
                {parseFloat(
                  Number(product.basePrice).toFixed(2),
                ).toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                })}{" "}
              </p>
            </div>
          ) : (
            <p className="font-semibold">
              {parseFloat(Number(product.basePrice).toFixed(2)).toLocaleString(
                "pt-BR",
                {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                },
              )}{" "}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
