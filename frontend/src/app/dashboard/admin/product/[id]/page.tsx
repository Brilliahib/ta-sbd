import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminDetailProductWrapper from "@/components/organisms/dashboard/admin/product/DashboardAdminDetailProductWrapper";

interface DashboardAdminDetailProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardAdminDetailProductPage({
  params,
}: DashboardAdminDetailProductPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Detail Produk"
        body="Menampilkan detail dari produk"
      />
      <DashboardAdminDetailProductWrapper id={id} />
    </section>
  );
}
