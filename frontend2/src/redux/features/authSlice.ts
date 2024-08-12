import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "@schemas/user";

interface IAuthState {
  authUser: IUser | null;
}

const initialState: IAuthState = {
  authUser: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthUser(state, actions: PayloadAction<IUser>) {
      state.authUser = actions.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;
