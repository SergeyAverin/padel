import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// getClubById
export const getClubById = async (clubId: string) => {
  const clubResponse = await axios.get(API_URL + `/club/${clubId}`);
  const club = await clubResponse;
  return club;
};
// createClub

// getUserBookmarks
// addClubInUserBookmarks
// removeClubFromUserBookmark
