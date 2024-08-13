import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./baseApi";
import { authSlice } from "./features/authSlice";
import { clubFilterSlice } from "./features/clubFilterSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    clubFilterSlice: clubFilterSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
