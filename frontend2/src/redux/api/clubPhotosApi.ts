import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

export const clubPhotosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteClubPhoto: builder.mutation<
      void,
      { clubId: number; photoId: number }
    >({
      query(data) {
        return {
          url: `/club/${data.clubId}/images/${data.photoId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [TAGS.CLUB_IMAGE],
    }),
    addClubPhoto: builder.mutation<void, { clubId: number; form: FormData }>({
      query(data) {
        return {
          url: `/club/${data.clubId}/images`,
          method: "POST",
          body: data.form,
        };
      },
      invalidatesTags: [TAGS.CLUB_IMAGE],
    }),
  }),
});

export const { useAddClubPhotoMutation, useDeleteClubPhotoMutation } =
  clubPhotosApi;
