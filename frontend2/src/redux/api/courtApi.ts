import { ICourt } from "@schemas/courts";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const courtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourts: builder.query<Array<ICourt>, number>({
      query(clubId) {
        return {
          url: `/club/courts/clubs/${clubId}`,
          method: "GET",
        };
      },
      providesTags: [TAGS.COURT],
    }),
    createCourt: builder.mutation<void, { name: string; clubId: number }>({
      query(data) {
        return {
          url: `/club/courts`,
          method: "POST",
          body: {
            club_id: data.clubId,
            court_name: data.name,
          },
        };
      },
      invalidatesTags: [TAGS.COURT],
    }),
    deleteCourt: builder.mutation<void, number>({
      query(courId) {
        return {
          url: `/club/courts/${courId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.COURT],
    }),
  }),
});

export const {
  useCreateCourtMutation,
  useDeleteCourtMutation,
  useGetCourtsQuery,
} = courtApi;
