import { RootState } from "@redux/store";

export const authUserSelector = (state: RootState) => state.authSlice.authUser;
