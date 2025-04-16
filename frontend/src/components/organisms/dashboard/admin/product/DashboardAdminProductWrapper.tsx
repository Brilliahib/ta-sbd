"use client";

import { productAdminColumns } from "@/components/atoms/datacolumn/DataProductAdmin";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllProduct } from "@/http/product/get-all-product";

export default function DashboardAdminProductWrapper() {
  const { data, isPending } = useGetAllProduct();
  return (
    <div>
      <DataTable
        data={data?.data ?? []}
        columns={productAdminColumns}
        isLoading={isPending}
      />
    </div>
  );
}
