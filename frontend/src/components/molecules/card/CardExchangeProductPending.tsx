import DialogDetailExchangeProduct from "@/components/atoms/dialog/DialogDetailExchangeProduct";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Exchange } from "@/types/exchange/exchange";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

interface CardExchangeProductPendingProps {
  data?: Exchange;
}

export default function CardExchangeProductPending({
  data,
}: CardExchangeProductPendingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExchangeId, setSelectedExchangeId] = useState<string | null>(
    null,
  );

  const handleDialogOpen = (id: string) => {
    setSelectedExchangeId(id);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Permintaan Tukar</CardTitle>
          <CardDescription>
            {format(
              new Date(data?.created_at ?? "Waktu tidak tersedia"),
              "EEEE, d MMMM yyyy",
              {
                locale: id,
              },
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-1 md:flex-row">
              <div className="text-muted-foreground md:w-4/12">Produk</div>
              <div className="capitalize md:w-8/12">{data?.name_product}</div>
            </div>
            <div className="flex flex-col gap-1 md:flex-row">
              <div className="text-muted-foreground md:w-4/12">Ukuran</div>
              <div className="uppercase md:w-8/12">{data?.size_product}</div>
            </div>
            <div className="flex flex-col gap-1 md:flex-row">
              <div className="text-muted-foreground md:w-4/12">Kategori</div>
              <div className="md:w-8/12">{data?.product.category.name}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size={"sm"}
            onClick={() => handleDialogOpen(data?.id ?? "")}
          >
            Lihat Permintaan
          </Button>
        </CardFooter>
      </Card>
      {selectedExchangeId && (
        <DialogDetailExchangeProduct
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          id={selectedExchangeId!}
        />
      )}
    </>
  );
}
