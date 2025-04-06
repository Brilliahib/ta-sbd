import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Exchange } from "@/types/exchange/exchange";

interface GetAllExchangePendingResponse {
  data: Exchange[];
}

export const GetAllExchangePendingHandler = async (
  token: string,
): Promise<GetAllExchangePendingResponse> => {
  const { data } = await api.get<GetAllExchangePendingResponse>(
    "/exchange/pending",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllExchangePending = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllExchangePendingResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["exchange-pending"],
    queryFn: () => GetAllExchangePendingHandler(token),
    ...options,
  });
};
