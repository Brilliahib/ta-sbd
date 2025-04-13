"use client";

import FormEditProduct from "@/components/molecules/form/product/FormEditProduct";
import { useGetDetailProduct } from "@/http/product/get-detail-product";

interface DashboardEditProductWrapperProps {
  id: string;
}

export default function DashboardEditProductWrapper({
  id,
}: DashboardEditProductWrapperProps) {
  const { data, isLoading } = useGetDetailProduct(id);
  if (!data) return null;
  return (
    <div>
      <FormEditProduct data={data?.data} id={id} isLoading={isLoading} />
    </div>
  );
}
