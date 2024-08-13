import { prismaClient } from "@/lib/prisma";
import Categories from "./components/categories";
import PromotionalBanner from "./components/promotional-banner";
import SectionTitle from "../../components/ui/section-title";
import ProductList from "@/components/ui/product-list";
import Link from "next/link";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8 py-8">
      <Link href={"/category/deals/all"}>
        <PromotionalBanner
          src="/banner-home-01.png"
          alt="55% de desconto só esse mês!"
        />
      </Link>

      <div className="px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle categorySlug="deals/all">Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <Link href={"/category/deals/mouses"}>
        <PromotionalBanner
          src="/banner-home-02.png"
          alt="55% de desconto em mouses só esse mês!"
        />
      </Link>

      <div>
        <SectionTitle categorySlug="keyboards">Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div>
        <Link href={"/category/deals/headphones"}>
          <PromotionalBanner
            src="/banner-home-03.png"
            alt="55% de desconto em fones só esse mês!"
          />
        </Link>
      </div>

      <div>
        <SectionTitle categorySlug="mouses">Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
