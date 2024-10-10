import { createSlice } from "@reduxjs/toolkit";

interface IGeoState {
  lat: number | null;
  lon: number | null;
}

const initialState: IGeoState = {
  lat: null,
  lon: null,
};

export const GeoSlice = createSlice({
  name: "Geo",
  initialState,
  reducers: {
    setGeo(state) {
      navigator.geolocation.getCurrentPosition((position) => {
        state.lat = position.coords.latitude;
        state.lon = position.coords.longitude;
      });
    },
  },
});

export const { setGeo } = GeoSlice.actions;
