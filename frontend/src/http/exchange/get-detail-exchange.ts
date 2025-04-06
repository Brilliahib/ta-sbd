import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Exchange } from "@/types/exchange/exchange";

interface GetDetailExchangeParams {
  id: string;
  token: string;
}

interface GetDetailExchangeResponse {
  data: Exchange;
}

export const GetDetailExchangeHandler = async ({
  id,
  token,
}: GetDetailExchangeParams): Promise<GetDetailExchangeResponse> => {
  const { data } = await api.get<GetDetailExchangeResponse>(
    `/exchange/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailExchange = (
  { id, token }: GetDetailExchangeParams,
  options?: Partial<UseQueryOptions<GetDetailExchangeResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["detail-exchange", id],
    queryFn: () => GetDetailExchangeHandler({ id, token }),
    ...options,
  });
};
