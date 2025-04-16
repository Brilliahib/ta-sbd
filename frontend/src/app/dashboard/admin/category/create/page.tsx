import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminCreateCategoryProduct from "@/components/organisms/dashboard/admin/category/DashboardAdminCreateCategoryProduct";

export default function DashboardCreateCategoryProductPage() {
  return (
    <section>
      <DashboardTitle
        head="Tambah Kategori Produk"
        body="Menampilkan halaman tambah kategori produk"
      />
      <DashboardAdminCreateCategoryProduct />
    </section>
  );
}
