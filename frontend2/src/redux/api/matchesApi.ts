import { IMatch } from "@schemas/match";
import { baseApi } from "../baseApi";
import { TAGS } from "@redux/tags";

const getProvidesTags = (result: { items: Array<IMatch> } | undefined) =>
  result
    ? [...result.items.map(({ id }) => ({ type: TAGS.MATCH, id })), TAGS.MATCH]
    : [TAGS.MATCH];

const serializeQueryArgs = ({ endpointName }: { endpointName: string }) => {
  return endpointName;
};

const merge = (
  currentCache: {
    items: Array<IMatch>;
  },
  newItems: {
    items: Array<IMatch>;
  }
) => {
  currentCache.items = currentCache.items
    .map((item1) => {
      const item2 = newItems.items.find((item) => item.id === item1.id);

      return item2 ? item2 : item1;
    })
    .reverse()
    .concat(
      newItems.items.filter(
        (item2) => !currentCache.items.some((item1) => item1.id === item2.id)
      )
    );
};

export const MatchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/user/${data.userId}/matches?page=${data.page}&size=2`,

      serializeQueryArgs,
      merge,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: getProvidesTags,
    }),
    getClubMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; clubId: number }
    >({
      query: (data) => `/club/${data.clubId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs,
      merge,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: getProvidesTags,
    }),
    getBookmarkedClubsMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) =>
        `/bookmark/${data.userId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs,
      merge,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: getProvidesTags,
    }),
    getFriendsMathches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) =>
        `/friends/${data.userId}/matches?page=${data.page}&size=20`,

      serializeQueryArgs,
      merge,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: getProvidesTags,
    }),
  }),
});

export const {
  useGetUserMatchesQuery,
  useGetBookmarkedClubsMatchesQuery,
  useGetFriendsMathchesQuery,
  useGetClubMatchesQuery,
} = MatchesApi;
