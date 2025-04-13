import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Purchase } from "@/types/purchases/purchase";

interface RestoreProductResponse {
  data: Purchase;
}

export const RestoreProductHandler = async (
  id: string,
  token: string,
): Promise<RestoreProductResponse> => {
  const { data } = await api.put(
    `/product/restore/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useRestoreProduct = (
  options?: UseMutationOptions<RestoreProductResponse, AxiosError, string>,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      RestoreProductHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
