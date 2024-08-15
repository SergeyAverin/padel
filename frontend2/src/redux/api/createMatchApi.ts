import { TAGS } from "@redux/tags";
import { baseApi } from "../baseApi";
import { IClub } from "@schemas/club";

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
  }),
});

export const { useGetClubsToCreatMatchQuery } = createMatchApi;
