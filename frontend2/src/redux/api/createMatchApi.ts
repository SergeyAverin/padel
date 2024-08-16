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
    getMatchesByDate: builder.query<
      Array<IMatch>,
      {
        month: number;
        day: number;
        clubId: number;
      }
    >({
      query(data) {
        return {
          url: `/matches/${data.clubId}/by_day?month=${data.month}&day=${data.day}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
  }),
});

export const {
  useGetClubsToCreatMatchQuery,
  useCreateMatchMutation,
  useGetMatchesByDateQuery,
} = createMatchApi;
