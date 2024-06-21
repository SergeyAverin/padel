import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string }, string>({
      query(userId) {
        return {
          url: `/auth/login`,
          method: "POST",
          body: userId,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
