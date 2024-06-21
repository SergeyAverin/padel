import { IUser } from "@redux/types/User";
import { baseApi } from "../baseApi";

export const bubblesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUser, void>({
      query() {
        return {
          url: `/user`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    getUserByUserId: builder.query<IUser, string>({
      query(userId) {
        return {
          url: `/user/${userId}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
    }),

    setNickName: builder.mutation<IUser, string>({
      query(nickname) {
        return {
          url: `/user/nickname`,
          method: "POST",
          body: nickname,
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSetNickNameMutation,
  useGetUserByUserIdQuery,
} = bubblesApi;
