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

interface HardDeleteProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  data?: Product | null;
  isPending?: boolean;
}

const HardDeleteProductDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: HardDeleteProductDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Produk Permanen?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-semibold">{data?.name}</span>? Produk yang
            dihapus permanen tidak akan bisa dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "destructive" })}
            onClick={confirmDelete}
          >
            Hapus Permanen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HardDeleteProductDialog;
