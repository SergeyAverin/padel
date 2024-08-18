import { ITag } from "@schemas/tags";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTagsByFriend: builder.query<Array<ITag>, string>({
      query(userId) {
        return {
          url: `/tags/friends/${userId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.TAG],
    }),

    createTag: builder.mutation<ITag, string>({
      query(name) {
        return {
          url: `/tags`,
          method: "POST",
          body: name,
        };
      },
      invalidatesTags: [TAGS.TAG],
    }),

    deleteTag: builder.mutation<void, number>({
      query(tagId) {
        return {
          url: `/tags/${tagId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.TAG],
    }),

    removeTag: builder.mutation<void, { userId: string; tagId: number }>({
      query(data) {
        return {
          url: `/tags/friends/${data.userId}`,
          body: data.tagId,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.TAG],
    }),
    addTag: builder.mutation<void, { userId: string; tagId: number }>({
      query(data) {
        return {
          url: `/tags/friends/${data.userId}`,
          method: "POST",
          body: data.tagId,
        };
      },
      invalidatesTags: [TAGS.TAG],
    }),
  }),
});

export const {
  useAddTagMutation,
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetTagsByFriendQuery,
  useRemoveTagMutation,
} = tagApi;
