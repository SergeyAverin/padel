import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { Gender, IUser } from "@schemas/user";

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
  gender: Gender;
  user1: IUser | string | null;
  user2: IUser | string | null;
  user3: IUser | string | null;
  user4: IUser | string | null;
  isOpenPanel: boolean;
  userIndex: number | null;
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
  gender: Gender.ANY,
  user1: null,
  user2: null,
  user3: null,
  user4: null,
  isOpenPanel: false,
  userIndex: null,
};

export const STEP_COUNT = 8;

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
    selectGender(state, actions: PayloadAction<Gender>) {
      state.gender = actions.payload;
    },
    setUserInMatch(
      state,
      action: PayloadAction<{ index: number; value: string | IUser | null }>
    ) {
      switch (action.payload.index) {
        case 1:
          state.user1 = action.payload.value;
          break;
        case 2:
          state.user2 = action.payload.value;
          break;
        case 3:
          state.user3 = action.payload.value;
          break;
        case 4:
          state.user4 = action.payload.value;
          break;
      }
    },
    changeIsOpenPanel(state, action: PayloadAction<boolean>) {
      state.isOpenPanel = action.payload;
    },
    changeUserIndex(state, action: PayloadAction<number>) {
      state.userIndex = action.payload;
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
  selectGender,
  setUserInMatch,
  changeIsOpenPanel,
  changeUserIndex,
} = createMatchSlice.actions;
