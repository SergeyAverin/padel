import { TAGS } from "@redux/tags";

import { baseApi } from "../baseApi";
import { IBubble } from "@redux/types/Bubble";

export const bubbleRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBubbleRequests: builder.query<IBubble[], string>({
      query() {
        return {
          url: `/bubble_requests/`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BUBBLE],
    }),
    acceptBubbleRequest: builder.mutation<IBubble, string>({
      query(bubbleId) {
        return {
          url: `/bubble_requests/${bubbleId}/accept`,
          method: "GET",
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),
    rejectBubbleRequest: builder.mutation<IBubble, string>({
      query(bubbleId) {
        return {
          url: `/bubble_requests/${bubbleId}/reject`,
          method: "GET",
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),
  }),
});

export const {
  useGetBubbleRequestsQuery,
  useAcceptBubbleRequestMutation,
  useRejectBubbleRequestMutation,
} = bubbleRequestsApi;
