import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCategoryProduct from "@/components/organisms/dashboard/admin/category/DashboardAdminCategoryProduct";

export default function DashboardAdminCategoryProductPage() {
  return (
    <section>
      <DashboardTitle
        head="Kategori Produk"
        body="Menampilkan semua data kategori produk"
      />
      <DashboardAdminCategoryProduct />
    </section>
  );
}
