import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CategoryProductType } from "@/validators/category-product/category-product-validator";
import { CategoryProduct } from "@/types/category-product/category-product";

interface EditCategoryProductPayload {
  id: string;
  body: CategoryProductType;
}

interface EditCategoryProductResponse {
  data: CategoryProduct;
}

export const EditCategoryProductHandler = async (
  id: string,
  body: CategoryProductType,
  token: string,
): Promise<EditCategoryProductResponse> => {
  const { data } = await api.put(`/category-product/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useEditCategoryProduct = (
  options?: UseMutationOptions<
    EditCategoryProductResponse,
    AxiosError<EditCategoryProductResponse>,
    EditCategoryProductPayload
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }: EditCategoryProductPayload) =>
      EditCategoryProductHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
