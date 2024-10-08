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
  newItems.items.forEach((item) => {
    const index = currentCache.items.findIndex((i) => item.id == i.id);
    if (index < 0) {
      currentCache.items.push(item);
    }
  });
};

export const MatchesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/user/${data.userId}/matches?page=${data.page}&size=50`,

      serializeQueryArgs,
      merge(
        currentCache: {
          items: Array<IMatch>;
        },
        newItems: {
          items: Array<IMatch>;
        },
        arg
      ) {
        if (arg.arg.page >= 2) {
          merge(currentCache, newItems);
        } else {
          currentCache.items = newItems.items;
        }
      },
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
      merge(
        currentCache: {
          items: Array<IMatch>;
        },
        newItems: {
          items: Array<IMatch>;
        },
        arg
      ) {
        if (arg.arg.page >= 2) {
          merge(currentCache, newItems);
        } else {
          currentCache.items = newItems.items;
        }
      },
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

    getAllMatches: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/all_games?page=${data.page}&size=50`,

      serializeQueryArgs,
      merge,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: getProvidesTags,
    }),
    getJoinGame: builder.query<
      { items: Array<IMatch> },
      { page: number; userId: string }
    >({
      query: (data) => `/join_to_game?page=${data.page}&size=50`,

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
  useGetJoinGameQuery,
  useGetAllMatchesQuery,
} = MatchesApi;
