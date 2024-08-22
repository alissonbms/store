import BadgeTitle from "@/components/ui/badge-title";
import OrderItem from "@/components/ui/order-item";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div className="flex h-full w-full flex-col gap-8 px-5 py-8">
      <BadgeTitle className="text-base uppercase">
        <PackageSearchIcon size={18} />
        Meus pedidos
      </BadgeTitle>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
