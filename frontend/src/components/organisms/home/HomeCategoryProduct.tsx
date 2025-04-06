"use client";

import CardProduct from "@/components/molecules/card/CardProduct";
import { useGetAllCategoryProduct } from "@/http/category-product/get-all-category-product";
import { useGetAllProductByCategory } from "@/http/product/get-all-product-by-category";

export default function HomeCategoryProduct() {
  const { data: categories } = useGetAllCategoryProduct();
  return (
    <div className="space-y-10">
      {categories?.data.map((category) => (
        <CategorySection
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </div>
  );
}

function CategorySection({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const { data, isPending } = useGetAllProductByCategory(categoryId);

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-lg font-bold md:text-xl">{categoryName}</h1>
      <div className="scrollbar-hidden flex w-full gap-4 overflow-x-auto whitespace-nowrap md:grid md:grid-cols-4 md:gap-6 md:overflow-visible">
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardProduct key={index} isLoading />
            ))
          : data?.data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
