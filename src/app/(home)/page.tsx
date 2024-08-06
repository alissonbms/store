"use client";

import Categories from "./components/categories";
import PromotionalBanner from "./components/promotional-banner";

export default function Home() {
  return (
    <div className="p-5">
      <PromotionalBanner
        imagePath="/banner-home-01.png"
        imageDescription="55% de desconto só nesse mês!"
      />

      <div className="mt-8">
        <Categories />
      </div>
    </div>
  );
}
