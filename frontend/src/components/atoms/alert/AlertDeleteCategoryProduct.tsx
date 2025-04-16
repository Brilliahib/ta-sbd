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
import { CategoryProduct } from "@/types/category-product/category-product";

interface DeleteCategoryProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmDelete: () => void;
  data?: CategoryProduct | null;
  isPending?: boolean;
}

const DeleteCategoryProductDialog = ({
  open,
  setOpen,
  confirmDelete,
  data,
  isPending,
}: DeleteCategoryProductDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Kategori Produk Permanen?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus{" "}
            <span className="font-semibold">{data?.name}</span>? Kategori produk
            yang dihapus permanen tidak akan bisa dikembalikan.
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

export default DeleteCategoryProductDialog;
