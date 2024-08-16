import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";

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

export const { useSetMatchStatusMutation, useSetScoreMutation } = matchApi;
