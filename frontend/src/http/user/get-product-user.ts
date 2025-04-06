import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetDetailUserProductResponse {
  data: Product[];
}

export const GetDetailUserProductHandler = async (
  id: string,
): Promise<GetDetailUserProductResponse> => {
  const { data } = await api.get<GetDetailUserProductResponse>(
    `/product/user/${id}`,
  );

  return data;
};

export const useGetDetailUserProduct = (
  id: string,
  options?: Partial<UseQueryOptions<GetDetailUserProductResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["product-user", id],
    queryFn: () => GetDetailUserProductHandler(id),
    ...options,
  });
};
