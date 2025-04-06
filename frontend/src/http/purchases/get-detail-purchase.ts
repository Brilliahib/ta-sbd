import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Purchase } from "@/types/purchases/purchase";

interface GetDetailPurchaseParams {
  id: string;
  token: string;
}

interface GetDetailPurchaseResponse {
  data: Purchase;
}

export const GetDetailPurchaseHandler = async ({
  id,
  token,
}: GetDetailPurchaseParams): Promise<GetDetailPurchaseResponse> => {
  const { data } = await api.get<GetDetailPurchaseResponse>(
    `/order/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailPurchase = (
  { id, token }: GetDetailPurchaseParams,
  options?: Partial<UseQueryOptions<GetDetailPurchaseResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["detail-purchase", id],
    queryFn: () => GetDetailPurchaseHandler({ id, token }),
    ...options,
  });
};
