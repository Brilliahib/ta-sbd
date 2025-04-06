"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import CardDetailProduct from "@/components/molecules/card/CardDetailProduct";
import { useGetDetailProduct } from "@/http/product/get-detail-product";
import ProductSimilarContent from "./ProductSimilarContent";
import { useMemo } from "react";

interface ProductDetailContentProps {
  id: string;
}

export default function ProductDetailContent({
  id,
}: ProductDetailContentProps) {
  const { data, isPending } = useGetDetailProduct(id);

  const categoryId = useMemo(
    () => data?.data?.category?.id ?? "",
    [data?.data?.category?.id],
  );

  return (
    <PageContainer>
      {isPending ? (
        <CardDetailProduct isLoading />
      ) : (
        <CardDetailProduct data={data?.data} />
      )}
      <ProductSimilarContent id={categoryId} />
    </PageContainer>
  );
}
