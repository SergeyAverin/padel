import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IMatch } from "@schemas/match";

export const blankApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlanks: builder.query<Array<IMatch>, void>({
      query() {
        return {
          url: `/match_with_our_blank`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BLANK],
    }),
    getMatchBlank: builder.query<number, number>({
      query(matchId) {
        return {
          url: `/match/${matchId}/blank`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BLANK],
    }),
    createBlank: builder.mutation<
      void,
      {
        user_1: number;
        user_2: number;
        user_3: number;
        user_4: number;
        matchId: number;
      }
    >({
      query(data) {
        return {
          url: `/match/${data.matchId}/blank`,
          method: "POST",
          body: {
            user_1: data.user_1,
            user_2: data.user_2,
            user_3: data.user_3,
            user_4: data.user_4,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateBlankMutation,
  useGetBlanksQuery,
  useGetMatchBlankQuery,
} = blankApi;
