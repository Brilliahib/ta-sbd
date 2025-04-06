import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Exchange } from "@/types/exchange/exchange";

interface GetAllExchangeResponse {
  data: Exchange[];
}

export const GetAllExchangeHandler = async (
  token: string,
): Promise<GetAllExchangeResponse> => {
  const { data } = await api.get<GetAllExchangeResponse>("/exchange", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllExchange = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllExchangeResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["exchange"],
    queryFn: () => GetAllExchangeHandler(token),
    ...options,
  });
};
