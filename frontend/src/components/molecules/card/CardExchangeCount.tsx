"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllExchangePending } from "@/http/exchange/get-all-exchange-pending";
import { useSession } from "next-auth/react";

export default function CardExchangeCount() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllExchangePending(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-relaxed">
          Jumlah Permintaan Tukar Belum Dikonfirmasi
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
