import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Purchase } from "@/types/purchases/purchase";

interface GetAllRequestPurchasesResponse {
  data: Purchase[];
}

export const GetAllRequestPurchasesHandler = async (
  token: string,
): Promise<GetAllRequestPurchasesResponse> => {
  const { data } = await api.get<GetAllRequestPurchasesResponse>(
    "/order/request",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAllRequestPurchases = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllRequestPurchasesResponse, AxiosError>
  >,
) => {
  return useQuery({
    queryKey: ["request-purchase"],
    queryFn: () => GetAllRequestPurchasesHandler(token),
    ...options,
  });
};
