import DashboardDetailProductWrapper from "@/components/organisms/dashboard/product/DashboardDetailProductWrapper";

interface DashboardDetailProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardDetailProductPage({
  params,
}: DashboardDetailProductPageProps) {
  const { id } = await params;
  return (
    <section>
      <DashboardDetailProductWrapper id={id} />
    </section>
  );
}
