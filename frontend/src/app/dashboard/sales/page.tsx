import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSalesWrapper from "@/components/organisms/dashboard/sales/DashboardSalesWrapper";

export default function DashboardSalesPage() {
  return (
    <>
      <DashboardTitle head="Penjualan" body="Menampilkan daftar penjualan." />
      <DashboardSalesWrapper />
    </>
  );
}
