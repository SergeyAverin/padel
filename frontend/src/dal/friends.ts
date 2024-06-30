import axios from "axios";
import { IUser } from "@schemas/user";

const API_URL = import.meta.env.VITE_API_URL;

export const getUserFriends = async (userId: string) => {
  const response = await axios.get(API_URL + `/friends/${userId}`);
  const friends = (await response.data) as Array<IUser>;
  return friends;
};
