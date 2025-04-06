"use client";

import { productUserColumns } from "@/components/atoms/datacolumn/DataProductUser";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllProductUser } from "@/http/product/get-all-product-user";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardProductWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllProductUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div className="space-y-6">
      <Link href={"/dashboard/product/create"}>
        <Button>
          <Plus />
          Tambah Produk
        </Button>
      </Link>
      <DataTable
        columns={productUserColumns}
        isLoading={isPending}
        data={data?.data ?? []}
      />
    </div>
  );
}
