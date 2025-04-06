import CardSimilarProduct from "@/components/molecules/card/CardSimilarProduct";
import { useGetAllProductByCategory } from "@/http/product/get-all-product-by-category";

interface ProductSimilarContentProps {
  id: string;
}

export default function ProductSimilarContent({
  id,
}: ProductSimilarContentProps) {
  const { data, isPending } = useGetAllProductByCategory(id ?? "", {
    enabled: !!id,
  });
  return (
    <div className="space-y-4 py-12 md:space-y-6">
      <h1 className="text-lg font-bold md:text-xl">Produk Serupa</h1>
      <div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-4 md:gap-6">
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <CardSimilarProduct key={index} isLoading />
            ))
          : data?.data.map((product) => (
              <CardSimilarProduct key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
