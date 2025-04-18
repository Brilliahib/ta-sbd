"use client";

import SoftDeleteProductDialog from "@/components/atoms/alert/AlertSoftDeleteProduct";
import { productUserColumns } from "@/components/atoms/datacolumn/DataProductUser";
import { SearchBar } from "@/components/atoms/search/SearchBar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllProductUser } from "@/http/product/get-all-product-user";
import {
  softDeleteProductHandler,
  useSoftDeleteProduct,
} from "@/http/product/soft-delete-product";
import { Product } from "@/types/product/product";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardProductWrapper() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const queryClient = useQueryClient();

  const handleSoftDelete = (data: Product) => {
    setSelectedProduct(data);
    setOpenDeleteDialog(true);
  };

  const { data, isPending } = useGetAllProductUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = data?.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const { mutate: softDeleteProductHandler, isPending: isDeletePending } =
    useSoftDeleteProduct({
      onSuccess: () => {
        setSelectedProduct(null);
        toast("Produk berhasil dihapus sementara!");
        queryClient.invalidateQueries({
          queryKey: ["product-user"],
        });
      },
      onError: () => {
        toast("Gagal menghapus produk sementara!");
      },
    });

  const onSubmitSoftDelete = () => {
    if (selectedProduct?.id) {
      softDeleteProductHandler(selectedProduct?.id);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchBar onSearch={setSearchTerm} />
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/dashboard/product/trash">
              <Button
                variant={"outline"}
                className="border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Sampah
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
          columns={productUserColumns(handleSoftDelete)}
          isLoading={isPending}
          data={filteredData ?? []}
        />
      </div>
      <SoftDeleteProductDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        confirmDelete={onSubmitSoftDelete}
        data={selectedProduct}
        isPending={false}
      />
    </>
  );
}
