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
import { useGetDetailExchange } from "@/http/exchange/get-detail-exchange";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface DialogDetailExchangeProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailExchangeProduct({
  open,
  setOpen,
  id,
}: DialogDetailExchangeProductProps) {
  const session = useSession();
  const { data } = useGetDetailExchange(
    {
      id,
      token: session.data?.access_token as string,
    },
    { enabled: session.status === "authenticated" },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Detail Permintaan Tukar</DialogTitle>
          <DialogDescription>
            Menampilkan detail permintaan penukaran produk
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] md:max-h-[75vh]">
          <div className="grid grid-cols-1 gap-4 border-b pb-8 pt-4 md:grid-cols-2">
            <div className="col-span-2 flex flex-col gap-2">
              <p className="text-base font-semibold capitalize">
                Produk yang ditawarkan
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Nama Produk</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.name_product}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Brand</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.brand_product}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Size</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.size_product}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Kondisi</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.condition}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Gambar</Label>
              <Image
                src={data?.data.image_url_product ?? ""}
                alt={data?.data.name_product ?? ""}
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-2">
            <div className="col-span-2 flex flex-col gap-2">
              <p className="text-base font-semibold capitalize">
                Produk Milik Anda
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Nama Produk</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.product.name}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Kategori Produk</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.product.category.name}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Brand</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.product.brand}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Size</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.product.size}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
              <Label>Kondisi</Label>
              <p className="capitalize text-muted-foreground">
                {data?.data.product.condition}
              </p>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <Label>Gambar</Label>
              <Image
                src={data?.data.product.image_url ?? ""}
                alt={data?.data.product.name ?? ""}
                width={200}
                height={200}
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex w-full gap-2 md:w-fit">
            <Button
              className="w-full border-input text-black md:w-fit"
              variant={"outline"}
            >
              Tolak Penawaran
            </Button>
            <Button className="w-full md:w-fit">Terima Penawaran</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
