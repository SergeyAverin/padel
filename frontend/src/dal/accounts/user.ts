import axios from "axios";

import { Hand, IUpdateUserData, Position } from "@schemas/user";
import AuthStore from "@store/account/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserInfo = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const user = await res.data;
  return user;
};

export const changeHand = async (userId: string, hand: Hand) => {
  await axios.patch(API_URL + `/user/${userId}/hand`, hand, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (AuthStore.authUser) {
    AuthStore.setHand(hand);
  }
};

export const changeLvl = async (lvl: number) => {
  await axios.patch(API_URL + "/user/lvl", lvl, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (AuthStore.authUser) {
    AuthStore.setLvL(lvl);
  }
};

export const changePosition = async (userId: string, position: Position) => {
  await axios.patch(API_URL + `/user/${userId}/position`, position, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (AuthStore.authUser) {
    AuthStore.setPositon(position);
  }
};

export const updateUser = async (userId: string, data: IUpdateUserData) => {
  await axios.patch(API_URL + `/user/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (AuthStore.authUser) {
    AuthStore.updateUserData(data);
  }
};

export const getStats = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/stats/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const stats = await res.data;
  return stats;
};

export const uploadPhoto = async (userId: string, photo: FormData) => {
  const req = await axios.post(
    API_URL + `/user/${userId}/upload_photo`,
    photo,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await req.data;
  if (AuthStore.authUser) {
    AuthStore.setAvatar(data);
  }
};