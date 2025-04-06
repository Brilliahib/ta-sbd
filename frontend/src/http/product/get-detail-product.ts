import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetDetailProductResponse {
  data: Product;
}

export const GetDetailProductHandler = async (
  id: string,
): Promise<GetDetailProductResponse> => {
  const { data } = await api.get<GetDetailProductResponse>(`/product/${id}`);

  return data;
};

export const useGetDetailProduct = (
  id: string,
  options?: Partial<UseQueryOptions<GetDetailProductResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["detail-product", id],
    queryFn: () => GetDetailProductHandler(id),
    ...options,
  });
};
