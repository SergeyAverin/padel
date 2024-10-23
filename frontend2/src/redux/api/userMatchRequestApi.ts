import { IJoinRequest } from "@schemas/joinRequest";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const userMatchRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMatchRequestByUser: builder.query<IJoinRequest, number>({
      query(match_id) {
        return {
          url: `/join_request/by_match/${match_id}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.JOIN_REQUEST],
    }),
    cancelMatchRequestByUser: builder.mutation<void, number>({
      query(match_id) {
        return {
          url: `/join_request/by_match/${match_id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.JOIN_REQUEST],
    }),
  }),
});

export const {
  useCancelMatchRequestByUserMutation,
  useGetMatchRequestByUserQuery,
} = userMatchRequestApi;
