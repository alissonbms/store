import { Badge } from "@/components/ui/badge";
import BadgeTitle from "@/components/ui/badge-title";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";
import React from "react";

interface DealsPageProps {
  params: {
    slug: string;
  };
}

const DealsPage = async ({ params: { slug } }: DealsPageProps) => {
  const products =
    slug === "all"
      ? await prismaClient.product.findMany({
          where: {
            discountPercentage: {
              gt: 0,
            },
          },
        })
      : await prismaClient.product.findMany({
          where: {
            discountPercentage: {
              gt: 0,
            },
            AND: {
              category: {
                slug: slug,
              },
            },
          },
        });
  return (
    <div className="flex flex-col gap-8 px-5 py-8">
      <BadgeTitle className="text-base uppercase">
        <PercentIcon size={18} />
        {slug === "all" ? "Ofertas" : slug === "headphones" ? "Fones" : slug}
      </BadgeTitle>

      <div className="grid grid-cols-2 gap-8">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
