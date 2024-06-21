import { TAGS } from "@redux/tags";

import { baseApi } from "../baseApi";
import { IBubble } from "@redux/types/Bubble";

export const bubbleRules = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setCommentAllowed: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; isAllowed: boolean }
    >({
      query({ bubbleId, isAllowed }) {
        return {
          url: `/bubble/${bubbleId}/rule/comment`,
          method: "POST",
          body: isAllowed,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setEmojiPreset: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; emojiPreset: number }
    >({
      query({ bubbleId, emojiPreset }) {
        return {
          url: `/bubble/${bubbleId}/emoji/preset`,
          method: "POST",
          body: emojiPreset,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setAnonimCommentAllowd: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; isAllowed: boolean }
    >({
      query({ bubbleId, isAllowed }) {
        return {
          url: `/bubble/${bubbleId}/rule/anonim_comment`,
          method: "POST",
          body: isAllowed,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setAllUserCanCreateStory: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; isAllowed: boolean }
    >({
      query({ bubbleId, isAllowed }) {
        return {
          url: `/bubble/${bubbleId}/rule/all_user_can_create_story`,
          method: "POST",
          body: isAllowed,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setPassword: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; password: string }
    >({
      query({ bubbleId, password }) {
        return {
          url: `/bubble/${bubbleId}/rule/password`,
          method: "POST",
          body: password,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setChat: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; chat: string }
    >({
      query({ bubbleId, chat }) {
        return {
          url: `/bubble/${bubbleId}/rule/chat`,
          method: "POST",
          body: chat,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),

    setHavePassword: builder.mutation<
      { items: IBubble[]; total: number },
      { bubbleId: string; isAllowed: boolean }
    >({
      query({ bubbleId, isAllowed }) {
        return {
          url: `/bubble/${bubbleId}/rule/have_password`,
          method: "POST",
          body: isAllowed,
        };
      },
      invalidatesTags: [TAGS.BUBBLE],
    }),
  }),
});

export const {
  useSetCommentAllowedMutation,
  useSetHavePasswordMutation,
  useSetAnonimCommentAllowdMutation,
  useSetEmojiPresetMutation,
  useSetPasswordMutation,
  useSetAllUserCanCreateStoryMutation,
  useSetChatMutation,
} = bubbleRules;
