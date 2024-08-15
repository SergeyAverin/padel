import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IClub } from "@schemas/club";
import { ICreateMatch, IMatch } from "@schemas/match";

export const createMatchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClubsToCreatMatch: builder.query<Array<IClub>, void>({
      query() {
        return {
          url: `/matches/clubs`,
          method: "GET",
        };
      },
      providesTags: [TAGS.CLUB],
    }),
    createMatch: builder.mutation<IMatch, ICreateMatch>({
      query(data) {
        return {
          url: `/matches`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetClubsToCreatMatchQuery, useCreateMatchMutation } =
  createMatchApi;
