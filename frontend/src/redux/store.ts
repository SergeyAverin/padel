import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./baseApi";
import { sidebarSlice } from "./features/sideBar";
import { storyCreateSlice } from "./features/storyCreate";

export const store = configureStore({
  reducer: {
    sidebarSlice: sidebarSlice.reducer,
    storyCreate: storyCreateSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
