import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { CategoryProduct } from "@/types/category-product/category-product";

interface GetAllCategoryProductResponse {
  data: CategoryProduct[];
}

export const GetAllCategoryProductHandler =
  async (): Promise<GetAllCategoryProductResponse> => {
    const { data } =
      await api.get<GetAllCategoryProductResponse>("/category-product");

    return data;
  };

export const useGetAllCategoryProduct = (
  options?: Partial<UseQueryOptions<GetAllCategoryProductResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["category-product"],
    queryFn: () => GetAllCategoryProductHandler(),
    ...options,
  });
};
