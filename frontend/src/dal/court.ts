import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCourtsByClubId = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/courts/clubs/${clubId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const courts = await res.data;
  return courts;
};

export const deleteCourt = async (courtId: number) => {
  await axios.delete(API_URL + `/club/courts/${courtId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
