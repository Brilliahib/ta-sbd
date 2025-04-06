import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types/product/product";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/format-price";
import SkeletonCardProductUser from "../skeleton/SkeletonCardProductUser";

interface ProductProps {
  product?: Product;
  isLoading?: boolean;
}

export default function CardProductUser({ product, isLoading }: ProductProps) {
  if (isLoading) {
    return <SkeletonCardProductUser />;
  }

  return (
    <Link href={`/product/${product?.id ?? "#"}`}>
      <Card className="shrink-0 border-0 shadow-none md:w-full">
        <CardHeader className="p-0">
          <Image
            src={product!.image_url}
            alt={product!.name}
            width={250}
            height={250}
            className="h-[250px] w-full rounded-md object-cover"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="border-0 p-0 pt-2 md:pt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium md:text-base">{product!.name}</p>
            <span className="text-sm text-muted-foreground">
              Size {product!.size}
            </span>
            <h1 className="font-bold">{formatPrice(product!.price)}</h1>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
