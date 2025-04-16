import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Purchase } from "@/types/purchases/purchase";

interface HardDeleteProductResponse {
  data: Purchase;
}

export const HardDeleteProductHandler = async (
  id: string,
  token: string,
): Promise<HardDeleteProductResponse> => {
  const { data } = await api.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useHardDeleteProduct = (
  options?: UseMutationOptions<HardDeleteProductResponse, AxiosError, string>,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      HardDeleteProductHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
