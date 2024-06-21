import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISideBarState {
  isOpened: boolean;
  isEditNickName: boolean;
}

const initialState: ISideBarState = {
  isOpened: false,
  isEditNickName: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSideBarIsOpened(state, actions: PayloadAction<boolean>) {
      state.isOpened = actions.payload;
    },
    setIsEditNickName(state, actions: PayloadAction<boolean>) {
      state.isEditNickName = actions.payload;
    },
  },
});

export const { setSideBarIsOpened, setIsEditNickName } = sidebarSlice.actions;
