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
    addUserInMatch: builder.mutation<
      void,
      {
        user_id: string | null;
        user_indx: number;
        match_id: number;
      }
    >({
      query(data) {
        return {
          url: `/matches/${data.match_id}`,
          method: "PUT",
          body: {
            user_id: data.user_id,
            user_index: data.user_indx,
          },
        };
      },
      invalidatesTags: (_, __, { match_id }) => [
        { type: TAGS.MATCH, id: match_id },
      ],
    }),
    addTextUser: builder.mutation<
      void,
      {
        user_indx: number;
        text_user: string | null;
        match_id: number;
      }
    >({
      query(data) {
        return {
          url: `/matches/${data.match_id}`,
          method: "PUT",
          body: {
            text_user: data.text_user,
            user_index: data.user_indx,
          },
        };
      },
      invalidatesTags: (_, __, { match_id }) => [
        { type: TAGS.MATCH, id: match_id },
      ],
    }),
  }),
});

export const {
  useGetUsersForMatchQuery,
  useAddUserInMatchMutation,
  useAddTextUserMutation,
} = addUserInMatchApi;
