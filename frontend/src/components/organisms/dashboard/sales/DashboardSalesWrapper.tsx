"use client";

import { purchaseColumns } from "@/components/atoms/datacolumn/DataPurchase";
import CardSalesProductPending from "@/components/molecules/card/CardSalesProductPending";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import SkeletonCardSalesProductPending from "@/components/molecules/skeleton/SkeletonCardSalesProductPending";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllRequestPurchases } from "@/http/purchases/get-request-purchase";
import { useSession } from "next-auth/react";

export default function DashboardSalesWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllRequestPurchases(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <div>
      <Tabs defaultValue="request">
        <TabsList className="mb-6 grid w-fit grid-cols-2">
          <TabsTrigger value="request">Belum Dikonfirmasi</TabsTrigger>
          <TabsTrigger value="history">Riwayat Penjualan</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          {isPending ? (
            <SkeletonCardSalesProductPending />
          ) : data?.data.length === 0 ? (
            <p className="text-muted-foreground">
              Tidak ada permintaan penukaran.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
              {data?.data.map((sales) => (
                <CardSalesProductPending key={sales.id} data={sales} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="history">
          <DataTable
            columns={purchaseColumns}
            isLoading={isPending}
            data={data?.data ?? []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
