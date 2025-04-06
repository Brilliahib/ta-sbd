import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDetailPurchase } from "@/http/purchases/get-detail-purchase";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { id as idLocale } from "date-fns/locale";
import { toast } from "sonner";
import { useApproveOrder } from "@/http/purchases/confirm-order";

interface DialogDetailSalesProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailSalesProduct({
  open,
  setOpen,
  id,
}: DialogDetailSalesProductProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailPurchase(
    {
      id,
      token: session.data?.access_token as string,
    },
    { enabled: session.status === "authenticated" },
  );

  const { mutate: approveOrderHandler, isPending: isConfirming } =
    useApproveOrder({
      onError: () => {
        toast.error("Gagal mengonfirmasi pembayaran!");
      },
      onSuccess: () => {
        toast.success("Berhasil mengonfirmasi pembayaran!");
        setOpen(false);
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Detail Pesanan</DialogTitle>
          <DialogDescription>
            Menampilkan detail pesanan produk
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] md:max-h-[75vh]">
          <div className="grid grid-cols-1 gap-4 pb-8 pt-4 md:grid-cols-2">
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Order ID</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="uppercase text-muted-foreground">
                  #{data?.data.id}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Nama Produk</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="capitalize text-muted-foreground">
                  {data?.data.product.name}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Brand</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="capitalize text-muted-foreground">
                  {data?.data.product.brand}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Size</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="capitalize text-muted-foreground">
                  {data?.data.product.size}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Kondisi</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="capitalize text-muted-foreground">
                  {data?.data.product.condition}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Kategori Produk</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p className="capitalize text-muted-foreground">
                  {data?.data.product.category.name}
                </p>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Bukti Pembayaran</Label>
              {isPending ? (
                <Skeleton className="h-48 w-48" />
              ) : (
                <Image
                  src={data?.data.payment_proof_url ?? ""}
                  alt={data?.data.product.name ?? ""}
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Tanggal Pembelian</Label>
              {isPending ? (
                <Skeleton className="h-5 w-full" />
              ) : (
                <p
                  suppressHydrationWarning
                  className="capitalize text-muted-foreground"
                >
                  {format(
                    new Date(data?.data.created_at ?? "Tanggal tidak ada"),
                    "EEEE, d MMMM yyyy",
                    {
                      locale: idLocale,
                    },
                  )}
                </p>
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex w-full gap-2 md:w-fit">
            <Button
              className="w-full md:w-fit"
              disabled={isPending || isConfirming || !data?.data?.id}
              onClick={() => {
                if (!data?.data?.id) {
                  toast.error("Data pesanan tidak ditemukan!");
                  return;
                }
                approveOrderHandler(data.data.id);
              }}
            >
              {isConfirming ? "Mengonfirmasi..." : "Konfirmasi Pembayaran"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
