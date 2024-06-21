import { TAGS } from "@redux/tags";

import { baseApi } from "../baseApi";
import { IStory } from "@redux/types/Story";

export const bubblesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loadStories: builder.mutation<
      { items: IStory[]; total: number },
      { page: number; bubbleId: string | undefined }
    >({
      query({ page, bubbleId }) {
        return {
          url: `/bubble/${bubbleId}/story?page=${page}&size=8`,
          method: "GET",
        };
      },
      invalidatesTags: [TAGS.STORY],
    }),
    loadPrivateJournal: builder.mutation<
      { items: IStory[]; total: number },
      number
    >({
      query(page) {
        return {
          url: `/user/private_journal?page=${page}&size=8`,
          method: "GET",
        };
      },
    }),
    deleteStory: builder.mutation<void, string>({
      query(object_id) {
        return {
          url: `/story/${object_id}`,
          method: "DELETE",
          invalidatesTags: [TAGS.STORY],
        };
      },
    }),
    repostStory: builder.mutation<
      IStory,
      { storyId: string | undefined; wall: string }
    >({
      query(object) {
        return {
          url: `/story/${object.storyId}/repost`,
          method: "POST",
          body: object.wall,
        };
      },
    }),
    updateStory: builder.mutation<
      void,
      { title: string; contend: string; storyId: string | undefined }
    >({
      query(story) {
        return {
          url: `/story/${story.storyId}`,
          method: "PATCH",
          body: {
            title: story.title,
            contend: story.contend,
          },
        };
      },
      invalidatesTags: [TAGS.STORY],
    }),
    createStory: builder.mutation<
      IStory,
      {
        title: string;
        contend: string;
        wall: string;
        emoji: number;
        emoji_preset: number;
      }
    >({
      query(story) {
        return {
          url: "/story",
          method: "POST",
          body: {
            title: story.title,
            contend: story.contend,
            wall: story.wall,
            emoji: story.emoji,
            emoji_preset: story.emoji_preset,
          },
        };
      },
      invalidatesTags: [TAGS.EMOTION],
    }),
    getStory: builder.query<IStory, string | undefined>({
      query(storyId) {
        return {
          url: `/story/${storyId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.STORY],
    }),
  }),
});

export const {
  useLoadStoriesMutation,
  useLoadPrivateJournalMutation,
  useGetStoryQuery,
  useCreateStoryMutation,
  useDeleteStoryMutation,
  useUpdateStoryMutation,
  useRepostStoryMutation,
} = bubblesApi;
