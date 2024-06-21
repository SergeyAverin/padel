import { baseApi } from "../baseApi";
import { IBubble } from "@redux/types/Bubble";

export const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    unsubscribe: builder.mutation<IBubble[], string>({
      query(bubble_id) {
        return {
          url: `/bubble/${bubble_id}/subscribe/`,
          method: "DELETE",
        };
      },
    }),
    subscribe: builder.mutation<IBubble[], string>({
      query(bubble_id) {
        return {
          url: `/bubble/${bubble_id}/subscribe/`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useUnsubscribeMutation, useSubscribeMutation } = subscribeApi;
