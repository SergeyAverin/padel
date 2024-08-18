import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IMatch } from "@schemas/match";

export const matchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setMatchStatus: builder.mutation<
      void,
      {
        matchId: number;
        status: string;
      }
    >({
      query(data) {
        return {
          url: `/matches/${data.matchId}/status`,
          method: "PUT",
          body: data.status,
        };
      },
      invalidatesTags: (_, __, { matchId }) => [
        { type: TAGS.MATCH, id: matchId },
      ],
    }),
    getMaatchById: builder.query<IMatch, number>({
      query(matchId) {
        return {
          url: `/matches/${matchId}`,
          method: "GET",
        };
      },
      providesTags: (match) => [{ type: TAGS.MATCH, id: match?.id }],
    }),

    setScore: builder.mutation<
      void,
      {
        matchId: number;
        score: number;
        team: number;
      }
    >({
      query(data) {
        return {
          url: `/matches/${data.matchId}/score`,
          method: "PUT",
          body: {
            score: data.score,
            team: data.team,
          },
        };
      },
      invalidatesTags: (_, __, { matchId }) => [
        { type: TAGS.MATCH, id: matchId },
      ],
    }),
  }),
});

export const {
  useSetMatchStatusMutation,
  useSetScoreMutation,
  useGetMaatchByIdQuery,
} = matchApi;
