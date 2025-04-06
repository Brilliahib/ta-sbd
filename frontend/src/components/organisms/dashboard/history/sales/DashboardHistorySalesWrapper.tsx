"use client";

import { purchaseColumns } from "@/components/atoms/datacolumn/DataPurchase";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllRequestPurchases } from "@/http/purchases/get-request-purchase";
import { useSession } from "next-auth/react";

export default function DashboardHistorySalesWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllRequestPurchases(
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
