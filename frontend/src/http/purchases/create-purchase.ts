import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PurchaseType } from "@/validators/purchase/purchase-validator";
import { Purchase } from "@/types/purchases/purchase";

interface PurchaseResponse {
  data: Purchase;
}

export const addPurchaseHandler = async (
  body: PurchaseType,
  token: string,
): Promise<PurchaseResponse> => {
  const formData = new FormData();

  formData.append("product_id", body.product_id);

  if (body.payment_proof_url) {
    formData.append("payment_proof_url", body.payment_proof_url);
  }

  const { data } = await api.post("/order", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddPurchase = (
  options?: UseMutationOptions<
    PurchaseResponse,
    AxiosError<PurchaseResponse>,
    PurchaseType
  >,
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PurchaseType) =>
      addPurchaseHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
