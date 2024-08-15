import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

interface ICreateMatchState {
  clubId: number | null;
  courtId: number | null;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  isPrivate: boolean;
  selectFriendsTag: string | null;
  step: number;
  lvlStart: string | null;
  lvlEnd: string | null;
  tag: string | null;
  court: string | null;
  isShowNext: boolean;
}

const initialState: ICreateMatchState = {
  step: 1,
  clubId: null,
  date: null,
  courtId: null,
  endDate: null,
  isPrivate: false,
  selectFriendsTag: null,
  startDate: null,
  lvlEnd: null,
  lvlStart: null,
  tag: null,
  court: null,
  isShowNext: true,
};

export const STEP_COUNT = 6;

export const resetState = createAction("resetState");

export const createMatchSlice = createSlice({
  name: "createMatch",
  initialState,
  reducers: {
    nextStep(state) {
      if (state.step + 1 <= STEP_COUNT) {
        state.step += 1;
      }
    },
    prevStep(state) {
      if (state.step - 1 != 0) {
        state.step -= 1;
      }
    },
    selectClub(state, actions: PayloadAction<number>) {
      state.clubId = actions.payload;
    },
    selectDate(state, actions: PayloadAction<string>) {
      state.date = actions.payload;
    },
    setIsShowNext(state, actions: PayloadAction<boolean>) {
      state.isShowNext = actions.payload;
    },
    selectStartDate(state, actions: PayloadAction<string>) {
      state.startDate = actions.payload;
    },
    selectEndDate(state, actions: PayloadAction<string>) {
      state.endDate = actions.payload;
    },
    selectLvlEndAction(state, actions: PayloadAction<string>) {
      state.lvlEnd = actions.payload;
    },
    selectLvlStartAction(state, actions: PayloadAction<string>) {
      state.lvlStart = actions.payload;
    },
    selectIsPrivate(state, actions: PayloadAction<boolean>) {
      state.isPrivate = actions.payload;
    },
    selectTag(state, actions: PayloadAction<string>) {
      state.tag = actions.payload;
    },
    selectCourt(state, actions: PayloadAction<string>) {
      state.court = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const {
  nextStep,
  prevStep,
  selectClub,
  selectDate,
  selectEndDate,
  selectStartDate,
  selectLvlEndAction,
  selectLvlStartAction,
  selectIsPrivate,
  selectCourt,
  selectTag,
  setIsShowNext,
} = createMatchSlice.actions;
