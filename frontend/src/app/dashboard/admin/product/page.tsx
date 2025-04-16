import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminProductWrapper from "@/components/organisms/dashboard/admin/product/DashboardAdminProductWrapper";

export default function DashboardAdminProductPage() {
  return (
    <section>
      <DashboardTitle head="Produk" body="Menampilkan semua data produk" />
      <DashboardAdminProductWrapper />
    </section>
  );
}
