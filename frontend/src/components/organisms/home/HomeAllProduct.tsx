"use client";

import CardProduct from "@/components/molecules/card/CardProduct";
import { useGetAllProduct } from "@/http/product/get-all-product";

export default function HomeAllProduct() {
  const { data, isPending } = useGetAllProduct();

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-lg font-bold md:text-xl">Produk Terbaru</h1>
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
