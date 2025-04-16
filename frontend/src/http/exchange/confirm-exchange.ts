import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Exchange } from "@/types/exchange/exchange";

interface ExchangeResponse {
  data: Exchange;
}

export const approveExchangeHandler = async (
  id: string,
  token: string,
): Promise<ExchangeResponse> => {
  const { data } = await api.put(
    `/exchange/confirm/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useApproveExchange = (
  options?: UseMutationOptions<ExchangeResponse, AxiosError, string>,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approveExchangeHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
