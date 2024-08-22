import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { computeProductTotalPrice } from "@/helpers/product";

import { Card } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { ClockIcon, CreditCardIcon } from "lucide-react";
import OrderProductItem from "./order-product-item";
import { Separator } from "./separator";
import CartDetails from "./details-cart";
import { useMemo } from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const totalQuantity = order.orderProducts.reduce(
    (accumulator, orderProduct) => accumulator + orderProduct.quantity,
    0,
  );

  const total = useMemo(() => {
    return order.orderProducts.reduce(
      (accumulator, orderProduct) =>
        accumulator +
        computeProductTotalPrice(orderProduct) * orderProduct.quantity,
      0,
    );
  }, [order.orderProducts]);

  const subTotal = useMemo(() => {
    return order.orderProducts.reduce(
      (accumulator, orderProduct) =>
        accumulator + Number(orderProduct.basePrice) * orderProduct.quantity,
      0,
    );
  }, [order.orderProducts]);

  const totalDiscount = subTotal - total;
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id} className="border-0">
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="font-bold uppercase">
                Pedido com: {totalQuantity} produto(s)
              </p>
              <div className="flex items-center gap-1 text-sm opacity-60">
                <span>
                  Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                </span>
                <ClockIcon size={16} />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-bold uppercase">Status</p>
                  {order.status === "PAYMENT_CONFIRMED" ? (
                    <p className="font-bold text-green-500">Pago</p>
                  ) : (
                    <p className="font-bold text-yellow-600">Pendente</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold uppercase">Data</p>
                  <p className="opacity-65">
                    {format(order.createdAt, "dd/MM/y")}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-bold uppercase">Pagamento</p>
                  {order.status === "PAYMENT_CONFIRMED" ? (
                    <div className="flex flex-row items-center gap-1">
                      <span className="text-green-500">Cartão</span>{" "}
                      <CreditCardIcon fill="#22c55e" color="#0A0A0A" />
                    </div>
                  ) : (
                    <p className="font-bold text-yellow-600">Aguardando..</p>
                  )}
                </div>
              </div>
              <Separator />
              <div className="my-5 flex flex-col gap-7">
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <CartDetails title={"Subtotal:"} value={subTotal} />
                <CartDetails
                  title={"Entrega:"}
                  text={"GRÁTIS"}
                  type={"shipment"}
                />
                <CartDetails
                  title={"Descontos:"}
                  value={totalDiscount}
                  type={"discount"}
                />
                <CartDetails
                  title={"Total:"}
                  value={total}
                  type="total"
                  className="text-sm font-bold"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
