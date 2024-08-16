import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";
import BadgeTitle from "@/components/ui/badge-title";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex flex-col gap-8 px-5 py-8">
      <BadgeTitle className="text-base uppercase">
        <ShapesIcon size={18} />
        Catálogo
      </BadgeTitle>

      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
