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
  }),
});

export const { useCreateClubMutation } = clubApi;
