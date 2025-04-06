import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function SkeletonCardExchangeProductPending() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-48" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-col gap-1 md:flex-row">
                <div className="text-muted-foreground md:w-4/12">Produk</div>
                <Skeleton className="h-4 w-32 md:w-8/12" />
              </div>
              <div className="flex flex-col gap-1 md:flex-row">
                <div className="text-muted-foreground md:w-4/12">Ukuran</div>
                <Skeleton className="h-4 w-20 md:w-8/12" />
              </div>
              <div className="flex flex-col gap-1 md:flex-row">
                <div className="text-muted-foreground md:w-4/12">Kategori</div>
                <Skeleton className="h-4 w-40 md:w-8/12" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size={"sm"} disabled>
              <Skeleton className="h-6 w-full" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
