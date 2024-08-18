import { RootState } from "@redux/store";

export const filterTagsSelector = (state: RootState) =>
  state.friendFilterSlice.filterTags;
