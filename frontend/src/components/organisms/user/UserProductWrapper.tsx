"use client";

import PageContainer from "@/components/atoms/container/PageContainer";
import CardDetailUserProduct from "@/components/molecules/card/CardDetailUserProduct";
import CardProductUser from "@/components/molecules/card/CardProductUser";
import SkeletonCardDetailUser from "@/components/molecules/skeleton/SkeletonCardDetailUser";
import { useGetDetailUser } from "@/http/user/get-detail-user";
import { useGetDetailUserProduct } from "@/http/user/get-product-user";

interface UserProductWrapperProps {
  id: string;
}

export default function UserProductWrapper({ id }: UserProductWrapperProps) {
  const { data, isPending } = useGetDetailUser(id);
  const { data: product, isPending: isFetching } = useGetDetailUserProduct(id);

  return (
    <>
      <main className="pt-8">
        <PageContainer>
          {isPending ? (
            <SkeletonCardDetailUser />
          ) : (
            <CardDetailUserProduct data={data?.data} />
          )}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-lg font-bold md:text-xl">Produk Yang Dijual</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {isFetching
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CardProductUser key={index} isLoading />
                  ))
                : product?.data.map((product) => (
                    <CardProductUser key={product.id} product={product} />
                  ))}
            </div>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
