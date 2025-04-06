"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllRequestPurchases } from "@/http/purchases/get-request-purchase";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CardSalesCount() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllRequestPurchases(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-relaxed">
          Jumlah Pesanan Belum Dikonfirmasi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {isPending ? (
            <Skeleton className="h-6 w-16 rounded-md" />
          ) : (
            <h1 className="text-2xl font-bold">{data?.data.length}</h1>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
