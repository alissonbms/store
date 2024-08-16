import { Badge } from "@/components/ui/badge";
import BadgeTitle from "@/components/ui/badge-title";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProductsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 px-5 py-8">
      <BadgeTitle className="text-base uppercase">
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </BadgeTitle>

      <div className="grid grid-cols-2 gap-8">
        {category.products.map((product) => (
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

export default CategoryProductsPage;
