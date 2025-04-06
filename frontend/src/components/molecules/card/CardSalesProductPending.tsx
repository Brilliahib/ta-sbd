import DialogDetailSalesProduct from "@/components/atoms/dialog/DialogDetailSalesProduct";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Purchase } from "@/types/purchases/purchase";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

interface CardSalesProductPendingProps {
  data?: Purchase;
}

export default function CardSalesProductPending({
  data,
}: CardSalesProductPendingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSalesId, setSelectedSalesId] = useState<string | null>(null);

  const handleDialogOpen = (id: string) => {
    setSelectedSalesId(id);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Belum Dikonfirmasi Pembayaran</CardTitle>
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
              <div className="capitalize md:w-8/12">{data?.product.name}</div>
            </div>
            <div className="flex flex-col gap-1 md:flex-row">
              <div className="text-muted-foreground md:w-4/12">Ukuran</div>
              <div className="uppercase md:w-8/12">{data?.product.size}</div>
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
            Lihat Detail
          </Button>
        </CardFooter>
      </Card>
      {selectedSalesId && (
        <DialogDetailSalesProduct
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          id={selectedSalesId!}
        />
      )}
    </>
  );
}
