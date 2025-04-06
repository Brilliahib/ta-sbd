import CardExchangeCount from "@/components/molecules/card/CardExchangeCount";
import CardSalesCount from "@/components/molecules/card/CardSalesCount";
import CardTotalSalesCount from "@/components/molecules/card/CardTotalSalesCount";
import { ChartSalesCount } from "@/components/molecules/chart/ChartSalesCount";

export default function DashboardWrapper() {
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
