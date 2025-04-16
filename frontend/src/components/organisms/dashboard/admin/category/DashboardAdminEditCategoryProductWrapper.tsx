"use client";

import FormEditCategoryProduct from "@/components/molecules/form/category-product/FormEditCategoryProduct";
import { useGetDetailCategoryProduct } from "@/http/category-product/get-detail-category-product";

interface DashboardAdminEditCategoryProductWrapperProps {
  id: string;
}

export default function DashboardAdminEditCategoryProductWrapper({
  id,
}: DashboardAdminEditCategoryProductWrapperProps) {
  const { data, isLoading } = useGetDetailCategoryProduct(id);
  if (!data) return null;
  return (
    <div>
      <FormEditCategoryProduct
        data={data?.data}
        id={id}
        isLoading={isLoading}
      />
    </div>
  );
}
