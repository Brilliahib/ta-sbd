import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardProductWrapper from "@/components/organisms/dashboard/product/DashboardProductWrapper";

export default function DashboardProductPage() {
  return (
    <>
      <DashboardTitle
        head="Daftar Produk"
        body="Menampilkan semua daftar produk yang dijual."
      />
      <DashboardProductWrapper />
    </>
  );
}
