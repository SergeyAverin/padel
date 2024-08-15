import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAddUserInMatchState {
  isOpen: boolean;
  matchId: number | null;
  index: number | null;
}

const initialState: IAddUserInMatchState = {
  isOpen: false,
  matchId: null,
  index: null,
};

export const addUserInMatchSlice = createSlice({
  name: "AddUserInMatch",
  initialState,
  reducers: {
    openPanel(
      state,
      action: PayloadAction<{ matchId: number; index: number }>
    ) {
      state.isOpen = true;
      state.matchId = action.payload.matchId;
      state.index = action.payload.index;
    },
    closePanel(state) {
      state.isOpen = false;
      state.matchId = null;
      state.index = null;
    },
  },
});

export const { openPanel, closePanel } = addUserInMatchSlice.actions;
