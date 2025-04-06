"use client";

import { purchaseColumns } from "@/components/atoms/datacolumn/DataPurchase";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllPurchases } from "@/http/purchases/get-all-purchase";
import { useSession } from "next-auth/react";

export default function DashboardPurchaseWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllPurchases(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <DataTable
        columns={purchaseColumns}
        isLoading={isPending}
        data={data?.data ?? []}
      />
    </div>
  );
}
