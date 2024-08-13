import { IUser } from "@schemas/user";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const friendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<Array<IUser>, string>({
      query(userId) {
        return {
          url: `/friends/${userId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIENDS],
    }),
  }),
});

export const { useGetFriendsQuery } = friendsApi;
