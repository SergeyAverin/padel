import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IUpdateUserData, IUser, IUserStats } from "@schemas/user";
import { setAuthUser } from "@redux/features/authSlice";

export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query<IUserStats, string>({
      query(userId) {
        return {
          url: `/user/stats/${userId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.PROFILE],
    }),
    getUserById: builder.query<IUser, string>({
      query(userId) {
        return {
          url: `/user/${userId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.USER],
    }),
    getUserProfile: builder.query<IUser, void>({
      query() {
        return {
          url: `/user/profile`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthUser(data));
          console.log(data);
        } catch (error) {
          console.error("Ошибка при выполнении мутации:", error);
        }
      },
      providesTags: [TAGS.PROFILE],
    }),
    updateUserInfo: builder.mutation<
      IUser,
      { userData: IUpdateUserData; userId: string }
    >({
      query(data) {
        return {
          url: `/user/${data.userId}`,
          method: "PATCH",
          body: data.userData,
        };
      },
      invalidatesTags: [TAGS.PROFILE],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
} = UserApi;
