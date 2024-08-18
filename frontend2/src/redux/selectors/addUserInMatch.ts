import { RootState } from "@redux/store";

export const isOpenSelector = (state: RootState) => state.addUserInMatch.isOpen;
export const matchIdSelector = (state: RootState) =>
  state.addUserInMatch.matchId;
export const indexSelector = (state: RootState) => state.addUserInMatch.index;
