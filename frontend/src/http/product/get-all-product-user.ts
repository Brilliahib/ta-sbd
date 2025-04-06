import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetAllProductUserResponse {
  data: Product[];
}

export const GetAllProductUserHandler = async (
  token: string,
): Promise<GetAllProductUserResponse> => {
  const { data } = await api.get<GetAllProductUserResponse>(
    "/product/users/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllProductUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllProductUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["product-user"],
    queryFn: () => GetAllProductUserHandler(token),
    ...options,
  });
};
