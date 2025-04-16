import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Exchange } from "@/types/exchange/exchange";

interface GetAllExchangeOtherResponse {
  data: Exchange[];
}

export const GetAllExchangeOtherHandler = async (
  token: string,
): Promise<GetAllExchangeOtherResponse> => {
  const { data } = await api.get<GetAllExchangeOtherResponse>(
    "/exchange/other",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllExchangeOther = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllExchangeOtherResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["exchange-other"],
    queryFn: () => GetAllExchangeOtherHandler(token),
    ...options,
  });
};
