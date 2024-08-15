import { IUser } from "@schemas/user";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const addUserInMatchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersForMatch: builder.query<Array<IUser>, number>({
      query(matchId) {
        return {
          url: `/matches/${matchId}/users_for_match`,
          method: "GET",
        };
      },
      providesTags: [TAGS.FRIENDS],
    }),
  }),
});

export const { useGetUsersForMatchQuery } = addUserInMatchApi;
