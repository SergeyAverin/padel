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
  const uniqueValues1 = new Set(currentCache.items);

  newItems.items = newItems.items.filter(
    (item) => !currentCache.items.includes(item)
  );

  for (let i = 0; i < newItems.items.length; i++) {
    const value = newItems.items[i];
    const index = currentCache.items.indexOf(value);
    if (index !== -1) {
      currentCache.items[index] = value;
    } else {
      currentCache.items.push(value);
      uniqueValues1.add(value);
    }
  }
  currentCache.items = Array.from(uniqueValues1);
};

export const MatchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/user/${data.userId}/matches?page=${data.page}&size=50`,

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
      query: (data) => `/club/${data.clubId}/matches?page=${data.page}&size=50`,

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
        `/bookmark/${data.userId}/matches?page=${data.page}&size=50`,

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
        `/friends/${data.userId}/matches?page=${data.page}&size=50`,

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
