import { IClub, ICreateClub } from "@schemas/club";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const clubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createClub: builder.mutation<IClub, ICreateClub>({
      query(data) {
        return {
          url: `/club`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [TAGS.PROFILE],
    }),
    getBookmarkedClubs: builder.query<Array<IClub>, void>({
      query() {
        return {
          url: `/club/bookmarks`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BOOKMARK],
    }),
    getClubs: builder.query<Array<IClub>, string>({
      query(fillters) {
        return {
          url: `/club/clubs${fillters}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.CLUB],
    }),
  }),
});

export const {
  useCreateClubMutation,
  useGetBookmarkedClubsQuery,
  useGetClubsQuery,
} = clubApi;
