import { RootState } from "@redux/store";

export const isSideBarOpenedSelector = (state: RootState) =>
  state.sidebarSlice.isOpened;
export const isEditNickNameSelector = (state: RootState) =>
  state.sidebarSlice.isEditNickName;
