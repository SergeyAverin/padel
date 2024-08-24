import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { ICreateJoinRequest, IJoinRequest } from "@schemas/joinRequest";

export const joinRequsetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJoinRequset: builder.query<Array<IJoinRequest>, number>({
      query(match_id) {
        return {
          url: `/join_requsets/match/${match_id}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.JOIN_REQUEST],
    }),
    deleteJoinRequest: builder.mutation<void, number>({
      query(join_requset_id) {
        return {
          url: `/join_requsts/${join_requset_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.JOIN_REQUEST],
    }),
    createJoinRequest: builder.mutation<void, ICreateJoinRequest>({
      query(userId) {
        return {
          url: `/join_request`,
          method: "POST",
          body: userId,
        };
      },
      invalidatesTags: [TAGS.JOIN_REQUEST],
    }),

    acceptJoinRequset: builder.mutation<
      void,
      {
        joinRequestId: number;
        matchId: number;
      }
    >({
      query(data) {
        console.log(data);
        return {
          url: `/join_requsts/${data.joinRequestId}`,
          method: "POST",
        };
      },
      invalidatesTags: (_, __, data) => [
        { type: TAGS.MATCH, id: data.matchId },
        TAGS.JOIN_REQUEST,
      ],
    }),
  }),
});

export const {
  useCreateJoinRequestMutation,
  useAcceptJoinRequsetMutation,
  useDeleteJoinRequestMutation,
  useGetJoinRequsetQuery,
} = joinRequsetApi;
