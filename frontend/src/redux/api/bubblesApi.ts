import { TAGS } from "@redux/tags";

import { baseApi } from "../baseApi";
import { IBubble } from "@redux/types/Bubble";

export const bubblesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loadOwnedBubbles: builder.mutation<
      { items: IBubble[]; total: number },
      number
    >({
      query(page) {
        return {
          url: `/user/bubbles?page=${page}&size=8`,
          method: "GET",
        };
      },
    }),

    loadBubblesCanCreateStory: builder.mutation<IBubble[], void>({
      query() {
        return {
          url: `/user/bubbles_for_stories`,
          method: "GET",
        };
      },
    }),

    getEmotions: builder.query<{ [key: string]: number }, string>({
      query(bubbleId) {
        return {
          url: `/bubble/${bubbleId}/emotions`,
          method: "GET",
        };
      },
      providesTags: [TAGS.EMOTION],
    }),

    loadSubscribeBubbles: builder.mutation<
      { items: IBubble[]; total: number },
      number
    >({
      query(page) {
        return {
          url: `/user/subscribe/?page=${page}&size=8`,
          method: "GET",
        };
      },
    }),

    createBubble: builder.mutation<
      IBubble,
      {
        chat_id: string;
        name: string;
        access_code: string;
      }
    >({
      query(bubbleData) {
        return {
          url: `/bubble`,
          method: "POST",
          body: bubbleData,
        };
      },
    }),

    loadBubbleById: builder.mutation<IBubble, string>({
      query(bubbleId) {
        return {
          url: `/bubble/${bubbleId}`,
          method: "GET",
        };
      },
    }),

    deleteBubble: builder.mutation<IBubble, string>({
      query(bubbleId) {
        return {
          url: `/bubble/${bubbleId}`,
          method: "DELETE",
        };
      },
    }),

    updateBubble: builder.mutation<
      IBubble,
      {
        name: string;
        access_code: string;
        bubbleId: string;
        chat_id: string | undefined;
      }
    >({
      query(bubbleData) {
        return {
          url: `/bubble/${bubbleData.bubbleId}`,
          method: "PATCH",
          body: {
            name: bubbleData.name,
            access_code: bubbleData.access_code,
            chat_id: bubbleData.chat_id,
          },
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    addBubble: builder.mutation<
      IBubble,
      { access_code: string; password: string | undefined }
    >({
      query({ access_code, password }) {
        return {
          url: `/bubble/access_code/${access_code}`,
          method: "POST",
          body: password,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    getBubble: builder.query<IBubble, string | undefined>({
      query(bubbleId) {
        return {
          url: `/bubble/${bubbleId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BUBBLE],
    }),
  }),
});

export const {
  useLoadOwnedBubblesMutation,
  useLoadSubscribeBubblesMutation,
  useCreateBubbleMutation,
  useGetBubbleQuery,
  useLoadBubbleByIdMutation,
  useDeleteBubbleMutation,
  useUpdateBubbleMutation,
  useAddBubbleMutation,
  useGetEmotionsQuery,
  useLoadBubblesCanCreateStoryMutation,
} = bubblesApi;
