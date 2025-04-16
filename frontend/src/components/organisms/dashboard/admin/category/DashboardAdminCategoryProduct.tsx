"use client";

import DeleteCategoryProductDialog from "@/components/atoms/alert/AlertDeleteCategoryProduct";
import { categoryProductColumns } from "@/components/atoms/datacolumn/DataCategoryProduct";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useDeleteCategoryProduct } from "@/http/category-product/delete-category-product";
import { useGetAllCategoryProduct } from "@/http/category-product/get-all-category-product";
import { CategoryProduct } from "@/types/category-product/category-product";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminCategoryProduct() {
  const { data, isPending } = useGetAllCategoryProduct();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategoryProduct, setSelectedCategoryProduct] =
    useState<CategoryProduct | null>(null);

  const queryClient = useQueryClient();

  const handleDelete = (data: CategoryProduct) => {
    setSelectedCategoryProduct(data);
    setOpenDeleteDialog(true);
  };

  const { mutate: deleteCategoryProductHandler, isPending: isDeletePending } =
    useDeleteCategoryProduct({
      onSuccess: () => {
        setSelectedCategoryProduct(null);
        toast("Kategori produk berhasil dihapus!");
        queryClient.invalidateQueries({
          queryKey: ["category-product"],
        });
      },
      onError: () => {
        toast("Gagal menghapus kategori produk!");
      },
    });

  const onSubmitDelete = () => {
    if (selectedCategoryProduct?.id) {
      deleteCategoryProductHandler(selectedCategoryProduct?.id);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Link href={"/dashboard/admin/category/create"}>
          <Button>
            <Plus /> Tambah Kategori Produk
          </Button>
        </Link>
        <DataTable
          data={data?.data ?? []}
          columns={categoryProductColumns(handleDelete)}
          isLoading={isDeletePending}
        />
      </div>
      <DeleteCategoryProductDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        confirmDelete={onSubmitDelete}
        data={selectedCategoryProduct}
        isPending={false}
      />
    </>
  );
}
