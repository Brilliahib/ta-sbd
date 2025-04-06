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

interface CardDetailProductProps {
  data?: Product;
  isLoading?: boolean;
}

export default function CardDetailProduct({
  data,
  isLoading,
}: CardDetailProductProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      {/* Image of product */}
      <div className="flex-[2]">
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
      <div className="flex-[1] space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {isLoading ? (
                <Skeleton className="h-6 w-40 rounded-md" />
              ) : (
                data!.name
              )}
            </CardTitle>
            <CardDescription>
              {isLoading ? (
                <Skeleton className="h-6 w-20 rounded-md" />
              ) : (
                `Kondisi ${data!.condition}`
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <Skeleton className="h-6 w-20 rounded-md" />
              ) : (
                <h1 className="text-xl font-bold">
                  {formatPrice(data!.price)}
                </h1>
              )}
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
              {/* Buttons */}
              <div className="flex flex-col space-y-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </>
                ) : (
                  <>
                    <Link href={`/product/${data?.id}/checkout`}>
                      <Button className="w-full">
                        <ShoppingCart /> Beli Sekarang
                      </Button>
                    </Link>
                    <Link href={`/product/${data?.id}/exchange`}>
                      <Button variant={"outline"} className="w-full">
                        <ArrowLeftRight /> Tukar Sekarang
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar className="border border-muted">
                <AvatarImage src={data?.user.name} />
                <AvatarFallback className="bg-white text-gray-700">
                  {generateFallbackFromName(data?.user.name ?? "")}
                </AvatarFallback>
              </Avatar>
              {isLoading ? (
                <Skeleton className="h-6 w-40 rounded-md" />
              ) : (
                data!.user.name
              )}
            </CardTitle>
            <CardDescription>
              {isLoading ? (
                <Skeleton className="h-6 w-40 rounded-md" />
              ) : data?.created_at ? (
                `Dipublish pada ${format(new Date(data.created_at), "EEEE d MMMM yyyy", { locale: id })}`
              ) : (
                "Tanggal tidak tersedia"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-full rounded-md" />
                </>
              ) : (
                <>
                  <Link href={`/user/${data?.user.id}`}>
                    <Button variant={"outline"} className="w-full">
                      Kunjungi Akun Penjual
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
