"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDetailProduct } from "@/http/product/get-detail-product";
import { formatPrice } from "@/utils/format-price";
import Image from "next/image";

interface CardPurchaseExchangeProductProps {
  id: string;
}

export default function CardPurchaseExchangeProduct({
  id,
}: CardPurchaseExchangeProductProps) {
  const { data, isLoading } = useGetDetailProduct(id);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Produk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 md:mb-8">
            {isLoading ? (
              <Skeleton className="h-[300px] w-full rounded-md" />
            ) : (
              <Image
                src={data?.data.image_url ?? ""}
                alt={data?.data.name ?? ""}
                width={1000}
                height={1000}
                className="h-[300px] w-full rounded-md object-cover"
              />
            )}
          </div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-1 md:flex-row">
                    <Skeleton className="h-5 w-4/12" />
                    <Skeleton className="h-5 w-8/12" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">Nama</div>
                  <div className="md:w-8/12">{data?.data.name}</div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">Harga</div>
                  <div className="md:w-8/12">
                    {formatPrice(data?.data.price)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">Ukuran</div>
                  <div className="md:w-8/12">{data?.data.size}</div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">
                    Deskripsi
                  </div>
                  <div className="md:w-8/12">
                    {data?.data.description ?? "Tidak ada deskripsi"}
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">Kondisi</div>
                  <div className="md:w-8/12">{data?.data.condition}</div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">
                    Kategori
                  </div>
                  <div className="md:w-8/12">{data?.data.category.name}</div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row">
                  <div className="text-muted-foreground md:w-4/12">Brand</div>
                  <div className="md:w-8/12">
                    {data?.data.brand ?? "Tidak memiliki brand"}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
