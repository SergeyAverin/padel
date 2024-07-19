import club from "@store/club";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCourtsByClubId = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/courts/clubs/${clubId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log(clubId);
  const courts = await res.data;
  console.log(courts);
  return courts;
};
