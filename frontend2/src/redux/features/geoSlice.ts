import { createSlice } from "@reduxjs/toolkit";

interface IGeoState {
  lat: number | null;
  lon: number | null;
}

const initialState: IGeoState = {
  lat: null,
  lon: null,
};
interface ILocationData {
  latitude: number;
  longitude: number;
}
export const GeoSlice = createSlice({
  name: "Geo",
  initialState,
  reducers: {
    setGeo(state) {
      if (window.Telegram.WebApp.platform == "tdesktop") {
        navigator.geolocation.getCurrentPosition((position) => {
          state.lat = position.coords.latitude;
          state.lon = position.coords.longitude;
        });
      } else {
        // @ts-ignore
        window.Telegram.WebApp.LocationManager.init(() => {
          // @ts-ignore
          window.Telegram.WebApp.LocationManager.getLocation(
            (data: null | ILocationData) => {
              if (data) {
                state.lat = data.latitude;
                state.lon = data.longitude;
              }
            }
          );
        });
      }
    },
  },
});

export const { setGeo } = GeoSlice.actions;
