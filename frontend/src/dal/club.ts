import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getClubById = async (clubId: string) => {
  const clubResponse = await axios.get(API_URL + `/club/${clubId}`);
  const club = await clubResponse.data;
  return club;
};

export const getIsClubBookmarked = async (clubId: number) => {
  const clubResponse = await axios.get(API_URL + `/club/${clubId}/is_bookmark`);
  const data = await clubResponse.data;
  return data.is_bookmark;
};

export const getClubs = async () => {
  const clubResponse = await axios.get(API_URL + "/club/clubs");
  const club = await clubResponse.data;
  return club;
};

// createClub

export const getClubsByBookmark = async () => {
  const clubResponse = await axios.get(API_URL + "/club/bookmarks");
  const club = await clubResponse.data;
  return club;
};

export const addClubInUserBookmarks = async (clubId: number) => {
  await axios.post(API_URL + "/club/bookmarks", clubId);
};

export const removeClubFromUserBookmark = async (clubId: number) => {
  await axios.delete(API_URL + "/club/bookmarks", { data: clubId });
};
