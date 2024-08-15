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
    }),
  }),
});

export const { useSetMatchStatusMutation, useSetScoreMutation } = matchApi;
