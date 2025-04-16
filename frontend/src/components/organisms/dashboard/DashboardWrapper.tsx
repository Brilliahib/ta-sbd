"use client";

import { useEffect } from "react";
import CardExchangeCount from "@/components/molecules/card/CardExchangeCount";
import CardSalesCount from "@/components/molecules/card/CardSalesCount";
import CardTotalSalesCount from "@/components/molecules/card/CardTotalSalesCount";
import { ChartSalesCount } from "@/components/molecules/chart/ChartSalesCount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardWrapper() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    } else if (session.user.role === "admin") {
      router.push("/dashboard/admin");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role === "admin") {
    return null;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        <CardSalesCount />
        <CardExchangeCount />
        <CardTotalSalesCount />
      </div>
      <ChartSalesCount />
    </div>
  );
}
