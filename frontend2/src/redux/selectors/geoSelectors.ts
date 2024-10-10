import { RootState } from "@redux/store";

export const latSelector = (state: RootState) => state.geoSlice.lat;
export const lonSelector = (state: RootState) => state.geoSlice.lon;
