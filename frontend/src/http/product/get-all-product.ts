import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetAllProductResponse {
  data: Product[];
}

export const GetAllProductHandler =
  async (): Promise<GetAllProductResponse> => {
    const { data } = await api.get<GetAllProductResponse>("/product");

    return data;
  };

export const useGetAllProduct = (
  options?: Partial<UseQueryOptions<GetAllProductResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => GetAllProductHandler(),
    ...options,
  });
};
