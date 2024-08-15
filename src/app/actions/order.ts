"use server";

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (products: CartProduct[], userId: string) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: products.map((product) => ({
            basePrice: product.basePrice,
            quantity: product.quantity,
            discountPercentage: product.discountPercentage,
            productId: product.id,
          })),
        },
      },
    },
  });

  return order;
};
