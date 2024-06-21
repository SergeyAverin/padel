import { baseApi } from "../baseApi";
import { IComment } from "@redux/types/Comment";

export const bubblesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loadComments: builder.mutation<
      { items: IComment[]; total: number },
      { page: number; story_id: string | undefined }
    >({
      query({ page, story_id }) {
        return {
          url: `/story/${story_id}/comment?page=${page}&size=8`,
          method: "GET",
        };
      },
    }),
    deleteComment: builder.mutation<void, string>({
      query(commentId) {
        return {
          url: `/comment/${commentId}`,
          method: "DELETE",
        };
      },
    }),

    updateComment: builder.mutation<
      IComment,
      {
        comment: string;
        parent_comment_id: string | undefined;
        story_id: string | undefined;
        comment_id: string;
      }
    >({
      query(commentData) {
        return {
          url: `/comment/${commentData.comment_id}`,
          method: "PATCH",
          body: {
            comment: commentData.comment,
            parent_comment_id: commentData.parent_comment_id,
            story_id: commentData.story_id,
          },
        };
      },
    }),

    createComment: builder.mutation<
      IComment,
      {
        comment: string;
        parent_comment_id: string | undefined;
        story_id: string | undefined;
      }
    >({
      query({ comment, parent_comment_id, story_id }) {
        return {
          url: `/comment`,
          method: "POST",
          body: {
            comment,
            parent_comment_id,
            story_id,
          },
        };
      },
    }),
  }),
});

export const {
  useLoadCommentsMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = bubblesApi;
