import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product/product";
import { ArrowLeftRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateFallbackFromName } from "@/utils/generate-name";
import Link from "next/link";
import { formatPrice } from "@/utils/format-price";

interface CardDetailProductDashboardProps {
  data?: Product;
  isLoading?: boolean;
}

export default function CardDetailProductDashboard({
  data,
  isLoading,
}: CardDetailProductDashboardProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      {/* Image of product */}
      <div className="lg:w-1/2">
        {isLoading ? (
          <Skeleton className="h-[600px] w-full rounded-md" />
        ) : (
          <Image
            src={data!.image_url}
            alt={data!.name}
            width={1000}
            height={1000}
            className="h-[300px] w-full rounded-md object-cover md:h-[600px]"
          />
        )}
      </div>

      {/* Card product */}
      <div className="space-y-6 lg:w-1/2">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                {isLoading ? (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="grid w-full grid-cols-2 gap-2">
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <Skeleton className="h-6 w-24 rounded-md" />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Nama
                      </div>
                      <div className="md:w-8/12">{data!.name}</div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Harga
                      </div>
                      <div className="md:w-8/12">
                        {formatPrice(data!.price)}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Kondisi
                      </div>
                      <div className="md:w-8/12">{data!.condition}</div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Ukuran
                      </div>
                      <div className="md:w-8/12">{data!.size}</div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Deskripsi
                      </div>
                      <div className="md:w-8/12">
                        {data!.description ?? "Tidak ada deskripsi"}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Kondisi
                      </div>
                      <div className="md:w-8/12">{data!.condition}</div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Kategori
                      </div>
                      <div className="md:w-8/12">{data!.category.name}</div>
                    </div>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <div className="text-muted-foreground md:w-4/12">
                        Brand
                      </div>
                      <div className="md:w-8/12">
                        {data!.brand ?? "Tidak memiliki brand"}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
