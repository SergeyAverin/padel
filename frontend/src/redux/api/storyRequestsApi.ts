import { TAGS } from "@redux/tags";

import { baseApi } from "../baseApi";
import { IStory } from "@redux/types/Story";

export const storyRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStoryRequests: builder.query<IStory[], string>({
      query() {
        return {
          url: `/story_requests/`,
          method: "GET",
        };
      },
      providesTags: [TAGS.STORY],
    }),
    acceptStoryRequest: builder.mutation<IStory, string>({
      query(storyId) {
        return {
          url: `/story_requests/${storyId}/accept`,
          method: "PUT",
        };
      },
      invalidatesTags: [TAGS.STORY],
    }),
    rejectStoryRequest: builder.mutation<IStory, string>({
      query(storyId) {
        return {
          url: `/story_requests/${storyId}/reject`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.STORY],
    }),
  }),
});

export const {
  useGetStoryRequestsQuery,
  useAcceptStoryRequestMutation,
  useRejectStoryRequestMutation,
} = storyRequestsApi;
