import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { CategoryProduct } from "@/types/category-product/category-product";
import { CategoryProductType } from "@/validators/category-product/category-product-validator";

interface NewCategoryProductResponse {
  data: CategoryProduct;
}

export const addNewCategoryProductHandler = async (
  body: CategoryProductType,
  token: string,
): Promise<NewCategoryProductResponse> => {
  const { data } = await api.post("/category-product", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddNewCategoryProduct = (
  options?: UseMutationOptions<
    NewCategoryProductResponse,
    AxiosError<NewCategoryProductResponse>,
    CategoryProductType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: CategoryProductType) =>
      addNewCategoryProductHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
