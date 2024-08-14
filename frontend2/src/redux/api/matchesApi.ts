import { IMatch } from "@schemas/match";
import { baseApi } from "../baseApi";

export const MatchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/user/${data.userId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getClubMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; clubId: number }
    >({
      query: (data) => `/club/${data.clubId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getBookmarkedClubsMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) =>
        `/bookmark/${data.userId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getFriendsMathches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) =>
        `/friends/${data.userId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items.push(...newItems.items);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useGetUserMatchesQuery,
  useGetBookmarkedClubsMatchesQuery,
  useGetFriendsMathchesQuery,
  useGetClubMatchesQuery,
} = MatchesApi;
