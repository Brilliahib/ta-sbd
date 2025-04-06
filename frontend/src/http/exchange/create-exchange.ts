import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Exchange } from "@/types/exchange/exchange";
import { ExchangeType } from "@/validators/exchange/exchange-validator";

interface ExchangeResponse {
  data: Exchange;
}

export const addExchangeHandler = async (
  body: ExchangeType,
  token: string,
): Promise<ExchangeResponse> => {
  const formData = new FormData();

  formData.append("product_id", body.product_id);
  formData.append("name_product", body.name_product);
  formData.append("condition", body.condition);
  formData.append("size_product", body.size_product);

  if (body.image_url_product) {
    formData.append("image_url_product", body.image_url_product);
  }

  if (body.brand_product) {
    formData.append("brand_product", body.brand_product);
  }

  const { data } = await api.post("/exchange", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddExchange = (
  options?: UseMutationOptions<
    ExchangeResponse,
    AxiosError<ExchangeResponse>,
    ExchangeType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ExchangeType) =>
      addExchangeHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
