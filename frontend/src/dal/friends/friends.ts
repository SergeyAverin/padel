import axios from "axios";
import { IUser } from "@schemas/user";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserFriends = async (userId: string) => {
  const response = await axios.get(API_URL + `/friends/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const friends = (await response.data) as Array<IUser>;
  return friends;
};

export const unUserFriends = async (userId: string) => {
  await axios.delete(API_URL + `/user/friend/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const findUser = async (username: string) => {
  const res = await axios.get(
    API_URL + `/user/find_user?username=${username}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await res.data;
  return data;
};

export const getRelationStatus = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/${userId}/relation_status`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.data;
  return data;
};
