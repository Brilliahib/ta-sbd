import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetAllProductByCategoryResponse {
  data: Product[];
}

export const GetAllProductByCategoryHandler = async (
  id: string,
): Promise<GetAllProductByCategoryResponse> => {
  const { data } = await api.get<GetAllProductByCategoryResponse>(
    `/product/category/${id}`,
  );

  return data;
};

export const useGetAllProductByCategory = (
  id: string,
  options?: Partial<
    UseQueryOptions<GetAllProductByCategoryResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["product-category", id],
    queryFn: () => GetAllProductByCategoryHandler(id),
    ...options,
  });
};
