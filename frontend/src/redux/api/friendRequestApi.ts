import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IFriendRequest } from "@schemas/friendRequest";

export const friendRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInnerFriendRequset: builder.query<Array<IFriendRequest>, void>({
      query() {
        return {
          url: `/friend_requests/inner`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIEND_REQUEST],
    }),
    getOuterFriendRequest: builder.query<Array<IFriendRequest>, void>({
      query() {
        return {
          url: `/friend_requests/outer`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIEND_REQUEST],
    }),

    acceptFriendRequset: builder.mutation<void, number>({
      query(friendRequestId) {
        return {
          url: `/friend_requests/${friendRequestId}/accept`,
          method: "POST",
        };
      },
      invalidatesTags: [TAGS.FRIEND_REQUEST, TAGS.FRIENDS],
    }),
    rejectFriendRequset: builder.mutation<void, number>({
      query(friendRequestId) {
        return {
          url: `/friend_requests/${friendRequestId}/reject`,
          method: "POST",
        };
      },
      invalidatesTags: [TAGS.FRIEND_REQUEST],
    }),
    cancelFriendRequset: builder.mutation<void, number>({
      query(friendRequestId) {
        return {
          url: `/friend_requests/${friendRequestId}/cancel`,
          method: "POST",
        };
      },
      invalidatesTags: [TAGS.FRIEND_REQUEST, TAGS.FRIENDS],
    }),
    createFriendRequest: builder.mutation<IFriendRequest, string>({
      query(userId) {
        return {
          url: `/friend_requests`,
          method: "POST",
          body: userId,
        };
      },
      invalidatesTags: [TAGS.FRIEND_REQUEST],
    }),
  }),
});

export const {
  useAcceptFriendRequsetMutation,
  useCancelFriendRequsetMutation,
  useRejectFriendRequsetMutation,
  useCreateFriendRequestMutation,
  useGetInnerFriendRequsetQuery,
  useGetOuterFriendRequestQuery,
} = friendRequestApi;
