import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IMatchScore } from "@schemas/matchScore";

export const matchScoreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMatchScores: builder.query<Array<IMatchScore>, number>({
      query(matchId) {
        return {
          url: `/match/${matchId}/match_score`,
          method: "GET",
        };
      },
      providesTags: [TAGS.MATHC_SCORE],
    }),
    deleteMatchScore: builder.mutation<void, number>({
      query(matchScoreId) {
        return {
          url: `/match/${matchScoreId}/match_score`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.MATHC_SCORE],
    }),
    changeMatchScore: builder.mutation<
      void,
      {
        match_score_id: number;
        team: number;
        score: number;
      }
    >({
      query(data) {
        return {
          url: `/match/${data.match_score_id}/match_score`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [TAGS.MATHC_SCORE],
    }),
    createMatchScore: builder.mutation<void, number>({
      query(matchId) {
        return {
          url: `/match/${matchId}/match_score`,
          method: "POST",
        };
      },
      invalidatesTags: [TAGS.MATHC_SCORE],
    }),
  }),
});

export const {
  useChangeMatchScoreMutation,
  useCreateMatchScoreMutation,
  useDeleteMatchScoreMutation,
  useGetMatchScoresQuery,
} = matchScoreApi;
