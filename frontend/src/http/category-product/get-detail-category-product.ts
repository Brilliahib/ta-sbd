import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CategoryProduct } from "@/types/category-product/category-product";

interface GetDetailCategoryProductResponse {
  data: CategoryProduct;
}

export const GetDetailCategoryProductHandler = async (
  id: string,
): Promise<GetDetailCategoryProductResponse> => {
  const { data } = await api.get<GetDetailCategoryProductResponse>(
    `/category-product/${id}`,
  );

  return data;
};

export const useGetDetailCategoryProduct = (
  id: string,
  options?: Partial<
    UseQueryOptions<GetDetailCategoryProductResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["detail-category-products", id],
    queryFn: () => GetDetailCategoryProductHandler(id),
    ...options,
  });
};
