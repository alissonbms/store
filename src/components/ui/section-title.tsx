import Link from "next/link";
import { ComponentProps } from "react";

interface SectionTitleProps extends ComponentProps<"p"> {
  categorySlug: string;
}

const SectionTitle = ({ children, categorySlug }: SectionTitleProps) => {
  return (
    <Link href={`/category/${categorySlug}`}>
      <p className="mb-4 pl-5 font-bold uppercase">{children}</p>
    </Link>
  );
};

export default SectionTitle;
