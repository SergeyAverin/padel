import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMatchByUserId = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};
export const getMatchByClubId = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/${clubId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};

export const getMatchesFromUserFriends = async (userId: string) => {
  const res = await axios.get(API_URL + `/friends/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};

export const getMatchesFromBookmarkedClubs = async (userId: string) => {
  const res = await axios.get(API_URL + `/bookmark/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};
