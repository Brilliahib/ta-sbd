"use client";

import CardExchangeCount from "@/components/molecules/card/CardExchangeCount";
import CardSalesCount from "@/components/molecules/card/CardSalesCount";
import CardTotalSalesCount from "@/components/molecules/card/CardTotalSalesCount";
import { ChartSalesCount } from "@/components/molecules/chart/ChartSalesCount";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardWrapper() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role === "admin") {
    router.push("/dashboard/admin");
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
