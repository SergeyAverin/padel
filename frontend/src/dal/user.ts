import axios from "axios";

import { Hand, IUpdateUserData, Position } from "@schemas/user";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserInfo = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/${userId}`);
  const user = await res.data;
  return user;
};

export const changeHand = async (userId: string, hand: Hand) => {
  await axios.patch(API_URL + `/user/${userId}/hand`, hand);
};

export const changePosition = async (userId: string, position: Position) => {
  await axios.patch(API_URL + `/user/${userId}/position`, position);
};

export const updateUser = async (userId: string, data: IUpdateUserData) => {
  console.log(data);
  await axios.patch(API_URL + `/user/${userId}`, data);
};
