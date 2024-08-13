import { RootState } from "@redux/store";

export const citySelector = (state: RootState) => state.clubFilterSlice.city;
export const nameSelector = (state: RootState) => state.clubFilterSlice.name;
export const isOpenPanelSelector = (state: RootState) =>
  state.clubFilterSlice.isOpenPanel;
