import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEditCategoryProductWrapper from "@/components/organisms/dashboard/admin/category/DashboardAdminEditCategoryProductWrapper";

interface DashboardAdminEditCategoryProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminEditCategoryProductPage({
  params,
}: DashboardAdminEditCategoryProductPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Edit Kategori Produk"
        body="Menampilkan halaman edit kategori produk"
      />
      <DashboardAdminEditCategoryProductWrapper id={id} />
    </section>
  );
}
