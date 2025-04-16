import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetAllUsersResponse {
  data: User[];
}

export const GetAllUsersHandler = async (
  token: string,
): Promise<GetAllUsersResponse> => {
  const { data } = await api.get<GetAllUsersResponse>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllUsers = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllUsersResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: () => GetAllUsersHandler(token),
    ...options,
  });
};
