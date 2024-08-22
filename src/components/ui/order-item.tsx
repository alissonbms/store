import { Prisma } from "@prisma/client";
import { format } from "date-fns";

import { Card } from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { CreditCardIcon } from "lucide-react";
import OrderProductItem from "./order-product-item";
import { Separator } from "./separator";

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
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id} className="border-0">
          <AccordionTrigger>
            <div className="flex flex-col gap-1">
              Pedido com: {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <Separator />
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-bold uppercase">Status</p>
                  {order.status === "PAYMENT_CONFIRMED" ? (
                    <p className="font-bold text-green-500">Pago</p>
                  ) : (
                    <p className="font-bold text-yellow-600">Aguardando</p>
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
                  <div className="flex flex-row items-center gap-1 opacity-65">
                    <span>Cartão</span> <CreditCardIcon />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-7">
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
