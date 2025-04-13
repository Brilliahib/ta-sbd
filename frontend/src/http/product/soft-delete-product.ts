import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Purchase } from "@/types/purchases/purchase";

interface SoftDeleteProductResponse {
  data: Purchase;
}

export const softDeleteProductHandler = async (
  id: string,
  token: string,
): Promise<SoftDeleteProductResponse> => {
  const { data } = await api.put(
    `/product/soft-delete/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useSoftDeleteProduct = (
  options?: UseMutationOptions<SoftDeleteProductResponse, AxiosError, string>,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      softDeleteProductHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
