"use client";

import HardDeleteProductDialog from "@/components/atoms/alert/AlertHardDeleteProduct";
import RestoreProductDialog from "@/components/atoms/alert/AlertRestoreProduct";
import { productTrashColumns } from "@/components/atoms/datacolumn/DataProductTrash";
import { SearchBar } from "@/components/atoms/search/SearchBar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllProductTrash } from "@/http/product/get-all-product-trash";
import { useHardDeleteProduct } from "@/http/product/hard-delete-product";
import { useRestoreProduct } from "@/http/product/restore-product";
import { Product } from "@/types/product/product";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Shirt } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardProductTrashWrapper() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [openHardDeleteDialog, setOpenHardDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const queryClient = useQueryClient();

  const handleRestoreProduct = (data: Product) => {
    setSelectedProduct(data);
    setOpenRestoreDialog(true);
  };

  const handleHardDeleteProduct = (data: Product) => {
    setSelectedProduct(data);
    setOpenHardDeleteDialog(true);
  };

  const { data, isPending } = useGetAllProductTrash(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = data?.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { mutate: restoreProductHandler, isPending: isDeletePending } =
    useRestoreProduct({
      onSuccess: () => {
        setSelectedProduct(null);
        toast("Produk berhasil dipulihkan!");
        queryClient.invalidateQueries({
          queryKey: ["product-trash"],
        });
      },
      onError: () => {
        toast("Gagal memulihkan produk!");
      },
    });

  const onSubmitRestore = () => {
    if (selectedProduct?.id) {
      restoreProductHandler(selectedProduct?.id);
    }
  };

  const { mutate: hardDeleteProductHandler, isPending: hardDeleteIsPending } =
    useHardDeleteProduct({
      onSuccess: () => {
        setSelectedProduct(null);
        toast("Produk berhasil dihapus permanen!");
        queryClient.invalidateQueries({
          queryKey: ["product-trash"],
        });
      },
      onError: () => {
        toast("Gagal menghapus permanen!");
      },
    });

  const onSubmitHardDelete = () => {
    if (selectedProduct?.id) {
      hardDeleteProductHandler(selectedProduct?.id);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchBar onSearch={setSearchTerm} />
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard/product">
              <Button variant={"outline"}>
                <Shirt className="mr-2 h-4 w-4" />
                Semua Produk
              </Button>
            </Link>
            <Link href="/dashboard/product/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </Link>
          </div>
        </div>
        <DataTable
          columns={productTrashColumns(
            handleRestoreProduct,
            handleHardDeleteProduct,
          )}
          isLoading={isPending}
          data={filteredData ?? []}
        />
      </div>
      <RestoreProductDialog
        open={openRestoreDialog}
        setOpen={setOpenRestoreDialog}
        confirmDelete={onSubmitRestore}
        data={selectedProduct}
        isPending={false}
      />
      <HardDeleteProductDialog
        open={openHardDeleteDialog}
        setOpen={setOpenHardDeleteDialog}
        confirmDelete={onSubmitHardDelete}
        data={selectedProduct}
        isPending={hardDeleteIsPending}
      />
    </>
  );
}
