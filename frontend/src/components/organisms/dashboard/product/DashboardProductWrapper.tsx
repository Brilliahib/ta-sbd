"use client";

import { productUserColumns } from "@/components/atoms/datacolumn/DataProductUser";
import { SearchBar } from "@/components/atoms/search/SearchBar";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllProductUser } from "@/http/product/get-all-product-user";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardProductWrapper() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useGetAllProductUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const filteredData = data?.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchBar onSearch={setSearchTerm} />
        <Link href="/dashboard/product/create">
          <Button className="rounded-2xl">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
        </Link>
      </div>
      <DataTable
        columns={productUserColumns}
        isLoading={isPending}
        data={filteredData ?? []}
      />
    </div>
  );
}
