import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Purchase } from "@/types/purchases/purchase";

interface OrderResponse {
  data: Purchase;
}

export const approveOrderHandler = async (
  id: string,
  token: string,
): Promise<OrderResponse> => {
  const { data } = await api.put(`/order/confirm/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useApproveOrder = (
  options?: UseMutationOptions<OrderResponse, AxiosError, string>,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approveOrderHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
