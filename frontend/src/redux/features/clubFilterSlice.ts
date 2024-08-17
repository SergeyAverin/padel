import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IClubFilterState {
  isOpenPanel: boolean;
  isAwaitSearch: boolean;
  city: string;
  name: string;
}

const initialState: IClubFilterState = {
  isOpenPanel: false,
  isAwaitSearch: false,
  city: "",
  name: "",
};

export const clubFilterSlice = createSlice({
  name: "ClubFilter",
  initialState,
  reducers: {
    setIsOpenPanel(state, actions: PayloadAction<boolean>) {
      state.isOpenPanel = actions.payload;
    },
    setName(state, actions: PayloadAction<string>) {
      state.name = actions.payload;
    },
    setIsAwaitSearch(state, actions: PayloadAction<boolean>) {
      state.isAwaitSearch = actions.payload;
    },
    setCity(state, actions: PayloadAction<string>) {
      state.city = actions.payload;
    },
  },
});

export const { setCity, setIsOpenPanel, setName, setIsAwaitSearch } =
  clubFilterSlice.actions;
