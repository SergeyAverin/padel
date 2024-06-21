import { RootState } from "@redux/store";

export const titleSelector = (state: RootState) => state.storyCreate.title;
export const contentSelector = (state: RootState) => state.storyCreate.content;
export const wallSelector = (state: RootState) => state.storyCreate.wall;
export const stepSelector = (state: RootState) => state.storyCreate.step;
export const emojiSelector = (state: RootState) => state.storyCreate.emoji;
export const emojiPresetSelector = (state: RootState) =>
  state.storyCreate.emoji_preset;
