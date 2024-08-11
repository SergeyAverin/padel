import axios from "axios";

import { ICreateClub } from "@schemas/club";
import ClubFiltersStore from "@store/clubs/clubFilter";

const API_URL = import.meta.env.VITE_API_URL;

export const getClubById = async (clubId: string) => {
  const clubResponse = await axios.get(API_URL + `/club/${clubId}`);
  const club = await clubResponse.data;
  return club;
};

export const getIsClubBookmarked = async (clubId: number) => {
  const clubResponse = await axios.get(
    API_URL + `/club/${clubId}/is_bookmark`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await clubResponse.data;
  return data.is_bookmark;
};

export const getClubs = async () => {
  let url = "/club/clubs";
  let flag = true;
  if (ClubFiltersStore.name != "") {
    url += `${flag ? "?" : "&"}name=${ClubFiltersStore.name}`;
    flag = false;
  }
  if (ClubFiltersStore.city != "") {
    url += `${flag ? "?" : "&"}city=${ClubFiltersStore.city}`;
    flag = false;
  }
  const clubResponse = await axios.get(API_URL + url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const club = await clubResponse.data;
  return club;
};

export const createClub = async (createClubData: ICreateClub) => {
  const createClubResponse = await axios.post(
    API_URL + "/club/",
    createClubData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const newClub = await createClubResponse.data;
  return newClub;
};

export const getClubsByBookmark = async () => {
  const clubResponse = await axios.get(API_URL + "/club/bookmarks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const club = await clubResponse.data;
  return club;
};

export const addClubInUserBookmarks = async (clubId: number) => {
  await axios.post(API_URL + "/club/bookmarks", clubId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const removeClubFromUserBookmark = async (clubId: number) => {
  await axios.delete(API_URL + "/club/bookmarks", {
    data: clubId,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteClub = async (clubId: number) => {
  await axios.delete(API_URL + `/club/${clubId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateClub = async (clubId: number, data: ICreateClub) => {
  await axios.patch(API_URL + `/club/${clubId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const loadClubPhoto = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/${clubId}/images`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.data;
  return data;
};

export const deletePhoto = async (clubId: number, photoId: number) => {
  await axios.delete(API_URL + `/club/${clubId}/images/${photoId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const uploadPhoto = async (clubId: number, photo: FormData) => {
  await axios.post(API_URL + `/club/${clubId}/images`, photo, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const uploadAvatar = async (clubId: number, photo: FormData) => {
  await axios.post(API_URL + `/club/image/${clubId}`, photo, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
