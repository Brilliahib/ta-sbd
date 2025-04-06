import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardHistoryPurchaseWrapper from "@/components/organisms/dashboard/history/purchase/DashboardHistoryPurchaseWrapper";

export default function DashboardHistoryPurchase() {
  return (
    <>
      <DashboardTitle
        head="Riwayat Pembelian"
        body="Menampilkan semua data riwayat pembelian."
      />
      <DashboardHistoryPurchaseWrapper />
    </>
  );
}
