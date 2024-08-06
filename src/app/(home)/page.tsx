import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import ProductList from "./components/product-list";
import PromotionalBanner from "./components/promotional-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div>
      <PromotionalBanner
        imagePath="/banner-home-01.png"
        imageDescription="55% de desconto só esse mês!"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>
      <div className="mt-8">
        <p className="mb-4 pl-5 font-bold uppercase">ofertas</p>
        <ProductList products={deals} />
      </div>

      <PromotionalBanner
        imagePath="/banner-home-02.png"
        imageDescription="55% de desconto em mouses só esse mês!"
      />
    </div>
  );
}
