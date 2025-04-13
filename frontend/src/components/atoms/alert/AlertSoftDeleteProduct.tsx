import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Product } from "@/types/product/product";

interface SoftDeleteProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  data?: Product | null;
  isPending?: boolean;
}

const SoftDeleteProductDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: SoftDeleteProductDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Produk Sementara?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-semibold">{data?.name}</span>? Produk yang
            dihapus tidak akan ditampilkan ke pengguna tetapi masih bisa
            dipulihkan nanti.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={confirmDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SoftDeleteProductDialog;
