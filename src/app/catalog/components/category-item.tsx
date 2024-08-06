import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}
const CategoryItem = async ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-br from-[#DC2626] to-[rgba(220,38,38,0.2)]">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
        <p className="text-center font-semibold">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;