import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Purchase } from "@/types/purchases/purchase";

interface GetAllPurchasesResponse {
  data: Purchase[];
}

export const GetAllPurchasesHandler = async (
  token: string,
): Promise<GetAllPurchasesResponse> => {
  const { data } = await api.get<GetAllPurchasesResponse>("/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllPurchases = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllPurchasesResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["purchase"],
    queryFn: () => GetAllPurchasesHandler(token),
    ...options,
  });
};
