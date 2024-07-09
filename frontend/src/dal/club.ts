import { ICreateClub } from "@schemas/club";
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

export const createClub = async (createClubData: ICreateClub) => {
  const createClubResponse = await axios.post(
    API_URL + "/club",
    createClubData
  );
  const newClub = await createClubResponse.data;
  return newClub;
};

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

export const deleteClub = async (clubId: number) => {
  await axios.delete(API_URL + `/club/${clubId}`);
};

export const updateClub = async (clubId: number, data: ICreateClub) => {
  await axios.patch(API_URL + `/club/${clubId}`, data);
};

export const loadClubPhoto = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/${clubId}/images`);
  const data = await res.data;
  return data;
};
