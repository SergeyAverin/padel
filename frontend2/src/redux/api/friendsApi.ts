import { IUser } from "@schemas/user";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const friendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<Array<IUser>, string>({
      query(userId) {
        return {
          url: `/friends/${userId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIENDS],
    }),
    getRelationStatus: builder.query<string, string>({
      query(userId) {
        return {
          url: `/user/${userId}/relation_status`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIENDS, TAGS.FRIEND_REQUEST],
    }),

    unfriend: builder.mutation<void, string>({
      query(userId) {
        return {
          url: `/user/friend/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.FRIENDS, TAGS.STATS],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useUnfriendMutation,
  useGetRelationStatusQuery,
} = friendsApi;
