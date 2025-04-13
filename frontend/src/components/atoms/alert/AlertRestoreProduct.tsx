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

interface RestoreProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  data?: Product | null;
  isPending?: boolean;
}

const RestoreProductDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: RestoreProductDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pulihkan data produk?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin memulihkan{" "}
            <span className="font-semibold">{data?.name}</span>? Produk yang
            dipulihkan akan ditampilkan kembali ke pengguna dan dapat dilihat di
            halaman produk.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={confirmDelete}
          >
            Pulihkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RestoreProductDialog;
