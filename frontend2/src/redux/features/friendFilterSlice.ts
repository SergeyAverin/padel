import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITag } from "@schemas/tags";

interface IFriendFilterState {
  filterTags: Array<ITag>;
}

const initialState: IFriendFilterState = {
  filterTags: [],
};

export const friendFilterSlice = createSlice({
  name: "FriendFilter",
  initialState,
  reducers: {
    addTag(state, actions: PayloadAction<ITag>) {
      if (state.filterTags.indexOf(actions.payload) < 0) {
        state.filterTags.push(actions.payload);
      }
    },
    removeTag(state, actions: PayloadAction<ITag>) {
      state.filterTags = state.filterTags.filter(
        (tagFilter) => tagFilter.id !== actions.payload.id
      );
    },
  },
});

export const { addTag, removeTag } = friendFilterSlice.actions;
