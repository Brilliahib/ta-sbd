import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEditProductWrapper from "@/components/organisms/dashboard/product/DashboardEditProductWrapper";

interface DashboardEditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardEditProductPage({
  params,
}: DashboardEditProductPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardTitle
        head="Edit Produk"
        body="Lengkapi form edit produk untuk melakukan edit produk"
      />
      <DashboardEditProductWrapper id={id} />
    </section>
  );
}
