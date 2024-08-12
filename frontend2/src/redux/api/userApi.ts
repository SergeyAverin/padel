import { baseApi } from "../baseApi";
import { IUserStats } from "@schemas/user";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<IUserStats, string>({
      query(userId) {
        return {
          url: `/user/stats/${userId}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
  }),
});

export const { useGetUserStatsQuery } = UserApi;
