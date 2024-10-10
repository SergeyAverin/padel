import { IClub, IClubPhoto, ICreateClub } from "@schemas/club";
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
      invalidatesTags: [TAGS.CLUB],
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
    getClubs: builder.query<{ items: Array<IClub> }, string>({
      query(fillters) {
        return {
          url: `/club/clubs${fillters}`,
          method: "GET",
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        newItems.items.forEach((item) => {
          const index = currentCache.items.findIndex((i) => item.id == i.id);
          if (index < 0) {
            currentCache.items.push(item);
          }
        });
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [TAGS.CLUB],
    }),
    getBookmarkStatus: builder.query<{ is_bookmark: boolean }, number>({
      query(clubId) {
        return {
          url: `/club/${clubId}/is_bookmark`,
          method: "GET",
        };
      },
      providesTags: [TAGS.BOOKMARK],
    }),
    addBookmark: builder.mutation<void, number>({
      query(clubId) {
        return {
          url: `/club/bookmarks`,
          method: "POST",
          body: clubId,
        };
      },
      invalidatesTags: [TAGS.BOOKMARK, TAGS.STATS, TAGS.CLUB],
    }),
    deleteBookmark: builder.mutation<void, number>({
      query(clubId) {
        return {
          url: `/club/bookmarks`,
          method: "DELETE",
          body: clubId,
        };
      },
      invalidatesTags: [TAGS.BOOKMARK, TAGS.STATS, TAGS.CLUB],
    }),
    getClubById: builder.query<IClub, string>({
      query(clubId) {
        return {
          url: `/club/${clubId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.CLUB],
    }),
    getGalary: builder.query<Array<IClubPhoto>, number>({
      query(clubId) {
        return {
          url: `/club/${clubId}/images`,
          method: "GET",
        };
      },
      providesTags: [TAGS.CLUB_IMAGE],
    }),
    deleteClub: builder.mutation<void, number>({
      query(clubId) {
        return {
          url: `/club/${clubId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.CLUB],
    }),
    updateClub: builder.mutation<IClub, { club: ICreateClub; clubId: number }>({
      query(club) {
        return {
          url: `/club/${club.clubId}`,
          method: "PATCH",
          body: club.club,
        };
      },
      invalidatesTags: [TAGS.CLUB],
    }),
    updateClubPhoto: builder.mutation<
      void,
      {
        clubId: number;
        body: FormData;
      }
    >({
      query(data) {
        return {
          url: `/club/image/${data.clubId}`,
          method: "POST",
          body: data.body,
        };
      },
      invalidatesTags: [TAGS.CLUB],
    }),
  }),
});

export const {
  useCreateClubMutation,
  useGetBookmarkedClubsQuery,
  useGetClubsQuery,
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetClubByIdQuery,
  useGetBookmarkStatusQuery,
  useGetGalaryQuery,
  useDeleteClubMutation,
  useUpdateClubMutation,
  useUpdateClubPhotoMutation,
} = clubApi;
