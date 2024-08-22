import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}
const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          alt={orderProduct.product.name}
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-fit items-center rounded-md bg-accent px-3 py-[2px]">
          <p className="text-center text-xs">
            Vendido e entregue por{" "}
            <span className="font-bold">Valeryian Store</span>
          </p>
        </div>
        <p className="text-xs">{orderProduct.product.name}</p>
        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold">
              {parseFloat(
                computeProductTotalPrice(orderProduct.product).toFixed(2),
              ).toLocaleString("pt-BR", {
                currency: "BRL",
                style: "currency",
                minimumFractionDigits: 2,
              })}
            </p>

            {orderProduct.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-65">
                {parseFloat(
                  Number(orderProduct.basePrice).toFixed(2),
                ).toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                  minimumFractionDigits: 2,
                })}
              </p>
            )}
          </div>
          <div className="text-xs opacity-65">
            Quant: {orderProduct.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
