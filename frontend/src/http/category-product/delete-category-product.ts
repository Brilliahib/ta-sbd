import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CategoryProduct } from "@/types/category-product/category-product";

interface DeleteCategoryProductResponse {
  data: CategoryProduct;
}

export const DeleteCategoryProductHandler = async (
  id: string,
  token: string,
): Promise<DeleteCategoryProductResponse> => {
  const { data } = await api.delete(`/category-product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteCategoryProduct = (
  options?: UseMutationOptions<
    DeleteCategoryProductResponse,
    AxiosError,
    string
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      DeleteCategoryProductHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
