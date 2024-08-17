import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import {
  Hand,
  IUpdateUserData,
  IUser,
  IUserStats,
  Position,
} from "@schemas/user";
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
      providesTags: [TAGS.PROFILE, TAGS.STATS],
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
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
    chageHand: builder.mutation<
      IUser,
      {
        userId: string;
        hand: Hand;
      }
    >({
      query(data) {
        return {
          url: `/user/${data.userId}/hand`,
          method: "PATCH",
          body: data.hand,
        };
      },
      invalidatesTags: [TAGS.PROFILE],
    }),
    chagePosition: builder.mutation<
      IUser,
      {
        userId: string;
        position: Position;
      }
    >({
      query(data) {
        return {
          url: `/user/${data.userId}/position`,
          method: "PATCH",
          body: data.position,
        };
      },
      invalidatesTags: [TAGS.PROFILE],
    }),
    updateAvetar: builder.mutation<
      void,
      {
        userId: string;
        body: FormData;
      }
    >({
      query(data) {
        return {
          url: `/user/${data.userId}/upload_photo`,
          method: "POST",
          body: data.body,
        };
      },
      invalidatesTags: [TAGS.PROFILE],
    }),
    setLvl: builder.mutation<void, number>({
      query(lvl) {
        return {
          url: `/user/lvl`,
          method: "PATCH",
          body: lvl,
        };
      },
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
  useChageHandMutation,
  useChagePositionMutation,
  useUpdateAvetarMutation,
  useSetLvlMutation,
} = UserApi;
