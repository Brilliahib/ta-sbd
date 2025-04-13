import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Product } from "@/types/product/product";
import { ProductType } from "@/validators/product/product-validator";

interface EditProductPayload {
  id: string;
  body: ProductType;
}

interface EditProductResponse {
  data: Product;
}

export const editProductHandler = async (
  id: string,
  body: ProductType,
  token: string,
): Promise<EditProductResponse> => {
  const formData = new FormData();

  formData.append("category_id", body.category_id);
  formData.append("name", body.name);
  formData.append("condition", body.condition);
  formData.append("size", body.size);
  formData.append("price", body.price.toString());

  if (body.image_url) {
    formData.append("image_url", body.image_url);
  }

  if (body.description) {
    formData.append("description", body.description);
  }

  if (body.brand) {
    formData.append("brand", body.brand);
  }

  const { data } = await api.put(`/product/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useEditProduct = (
  options?: UseMutationOptions<
    EditProductResponse,
    AxiosError<EditProductResponse>,
    EditProductPayload
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }: EditProductPayload) =>
      editProductHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
