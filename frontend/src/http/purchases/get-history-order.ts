import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Purchase } from "@/types/purchases/purchase";

interface GetAllHistoryOrderResponse {
  data: Purchase[];
}

export const GetAllHistoryOrderHandler = async (
  token: string,
): Promise<GetAllHistoryOrderResponse> => {
  const { data } = await api.get<GetAllHistoryOrderResponse>("/order/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllHistoryOrder = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllHistoryOrderResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["history-order"],
    queryFn: () => GetAllHistoryOrderHandler(token),
    ...options,
  });
};
