import { baseApi } from "../baseApi";
import { IUser, IUserStats } from "@schemas/user";

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
    getUserById: builder.query<IUser, string>({
      query(userId) {
        return {
          url: `/user/${userId}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetUserByIdQuery } = UserApi;
