import { RootState } from "@redux/store";

export const clubIdSelector = (state: RootState) =>
  state.creaetMatchSlice.clubId;
export const stepSelector = (state: RootState) => state.creaetMatchSlice.step;
export const dateSelector = (state: RootState) => state.creaetMatchSlice.date;
export const startAtSelector = (state: RootState) =>
  state.creaetMatchSlice.startDate;
export const endAtSelector = (state: RootState) =>
  state.creaetMatchSlice.endDate;
export const lvlMinSelector = (state: RootState) =>
  state.creaetMatchSlice.lvlStart;
export const lvlMaxSelector = (state: RootState) =>
  state.creaetMatchSlice.lvlEnd;
export const isPrivateSelector = (state: RootState) =>
  state.creaetMatchSlice.isPrivate;
export const tagSelector = (state: RootState) => state.creaetMatchSlice.tag;
export const courtSelector = (state: RootState) => state.creaetMatchSlice.court;
export const isShowNextSelector = (state: RootState) =>
  state.creaetMatchSlice.isShowNext;
