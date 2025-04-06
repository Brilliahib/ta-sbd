import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetDetailUserResponse {
  data: User;
}

export const GetDetailUserHandler = async (
  id: string,
): Promise<GetDetailUserResponse> => {
  const { data } = await api.get<GetDetailUserResponse>(`/user/${id}`);

  return data;
};

export const useGetDetailUser = (
  id: string,
  options?: Partial<UseQueryOptions<GetDetailUserResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["detail-user", id],
    queryFn: () => GetDetailUserHandler(id),
    ...options,
  });
};
