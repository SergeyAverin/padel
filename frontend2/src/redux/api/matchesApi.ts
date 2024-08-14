import { baseApi } from "../baseApi";

export const MatchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMatches: builder.query({
      query: (page) => `pokemon?page=${page}&size=20`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetUserMatchesQuery } = MatchesApi;
