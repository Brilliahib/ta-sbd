"use client";

import CardDetailProductAdmin from "@/components/molecules/card/CardDetailProductAdmin";
import { useGetDetailProduct } from "@/http/product/get-detail-product";

interface DashboardAdminDetailProductWrapperProps {
  id: string;
}

export default function DashboardAdminDetailProductWrapper({
  id,
}: DashboardAdminDetailProductWrapperProps) {
  const { data, isPending } = useGetDetailProduct(id);
  return (
    <div>
      <CardDetailProductAdmin data={data?.data} isLoading={isPending} />
    </div>
  );
}
