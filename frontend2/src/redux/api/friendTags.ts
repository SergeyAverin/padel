import { ITag } from "@schemas/tags";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const friendTagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriendTags: builder.query<Array<ITag>, void>({
      query() {
        return {
          url: `/tags`,
          method: "GET",
        };
      },
      providesTags: [TAGS.TAG],
    }),
  }),
});

export const { useGetFriendTagsQuery } = friendTagsApi;
