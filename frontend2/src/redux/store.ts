import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./baseApi";
import { authSlice } from "./features/authSlice";
import { clubFilterSlice } from "./features/clubFilterSlice";
import { createMatchSlice } from "./features/creaetMatchSlice";
import { friendFilterSlice } from "./features/friendFilterSlice";
import { addUserInMatchSlice } from "./features/addUserInMatch";
import { GeoSlice } from "./features/geoSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    clubFilterSlice: clubFilterSlice.reducer,
    creaetMatchSlice: createMatchSlice.reducer,
    friendFilterSlice: friendFilterSlice.reducer,
    addUserInMatch: addUserInMatchSlice.reducer,
    geoSlice: GeoSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([baseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
