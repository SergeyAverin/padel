import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getClubById = async (clubId: string) => {
  const clubResponse = await axios.get(API_URL + `/club/${clubId}`);
  const club = await clubResponse;
  return club;
};
// createClub

export const getUserByBookmark = async () => {
  const clubResponse = await axios.get(API_URL + "/club/bookmarks");
  const club = await clubResponse;
  return club;
};

export const addClubInUserBookmarks = async (clubId: string) => {
  await axios.post(API_URL + "/club/bookmarks", clubId);
};

export const removeClubFromUserBookmark = async (clubId: string) => {
  await axios.delete(API_URL + "/club/bookmarks", { data: clubId });
};
