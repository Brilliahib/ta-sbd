import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Product } from "@/types/product/product";

interface GetAllProductTrashResponse {
  data: Product[];
}

export const GetAllProductTrashHandler = async (
  token: string,
): Promise<GetAllProductTrashResponse> => {
  const { data } = await api.get<GetAllProductTrashResponse>(
    "/product/soft-delete",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllProductTrash = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllProductTrashResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["product-trash"],
    queryFn: () => GetAllProductTrashHandler(token),
    ...options,
  });
};
