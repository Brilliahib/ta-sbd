"use client";

import { exchangeColumns } from "@/components/atoms/datacolumn/DataExchange";
import CardExchangeProductPending from "@/components/molecules/card/CardExchangeProductPending";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import SkeletonCardExchangeProductPending from "@/components/molecules/skeleton/SkeletonCardExchangeProductPending";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllExchange } from "@/http/exchange/get-all-exchange";
import { useGetAllExchangePending } from "@/http/exchange/get-all-exchange-pending";
import { useSession } from "next-auth/react";

export default function DashboardExchangeWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllExchangePending(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const { data: exchange } = useGetAllExchange(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <>
      <Tabs defaultValue="request">
        <TabsList className="mb-6 grid w-fit grid-cols-2">
          <TabsTrigger value="request">Daftar Permintaan</TabsTrigger>
          <TabsTrigger value="history">Riwayat Penukaran</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          {isPending ? (
            <SkeletonCardExchangeProductPending />
          ) : data?.data.length === 0 ? (
            <p className="text-muted-foreground">
              Tidak ada permintaan penukaran.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
              {data?.data.map((product) => (
                <CardExchangeProductPending key={product.id} data={product} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="history">
          <DataTable
            columns={exchangeColumns}
            isLoading={isPending}
            data={exchange?.data ?? []}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
