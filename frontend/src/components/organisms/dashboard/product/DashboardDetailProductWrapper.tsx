"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardDetailProductDashboard from "@/components/molecules/card/CardDetailProductDashboard";
import { useGetDetailProduct } from "@/http/product/get-detail-product";

interface DashboardDetailProductWrapperProps {
  id: string;
}

export default function DashboardDetailProductWrapper({
  id,
}: DashboardDetailProductWrapperProps) {
  const { data, isPending } = useGetDetailProduct(id);

  return (
    <div>
      <DashboardTitle
        head="Detail Produk"
        body="Menampilkan detail dari produk"
      />
      <CardDetailProductDashboard data={data?.data} isLoading={isPending} />
    </div>
  );
}
