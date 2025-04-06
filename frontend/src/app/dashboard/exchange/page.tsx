import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardExchangeWrapper from "@/components/organisms/dashboard/exchange/DashboardExchangeWrapper";

export default function ExchangeDashboardPage() {
  return (
    <>
      <DashboardTitle
        head="Penawaran Tukar Produk"
        body="Menampilkan daftar penawaran tukar produk."
      />
      <DashboardExchangeWrapper />
    </>
  );
}
