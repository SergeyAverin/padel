import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IStoryCreateState {
  title: string;
  content: string;
  wall: string;
  emoji: number;
  step: number;
  emoji_preset: number;
}

const initialState: IStoryCreateState = {
  title: "",
  content: "",
  wall: "",
  emoji: 1,
  step: 1,
  emoji_preset: 1,
};

export const storyCreateSlice = createSlice({
  name: "storyCreateSlice",
  initialState,
  reducers: {
    setStoryData(
      state,
      actions: PayloadAction<{ title: string; content: string }>
    ) {
      state.title = actions.payload.title;
      state.content = actions.payload.content;
    },
    setWall(state, actions: PayloadAction<string>) {
      state.wall = actions.payload;
    },
    setEmoji(
      state,
      actions: PayloadAction<{ emoji: number; emoji_preset: number }>
    ) {
      state.emoji = actions.payload.emoji;
      state.emoji_preset = actions.payload.emoji_preset;
    },
    setStep(state, actions: PayloadAction<number>) {
      state.step = actions.payload;
    },
  },
});

export const { setStoryData, setWall, setStep, setEmoji } =
  storyCreateSlice.actions;
