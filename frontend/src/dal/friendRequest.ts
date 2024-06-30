import axios from "axios";

import { IFriendRequest } from "../types/friendRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const getFriendRequests = async () => {
  const response = await axios.get(API_URL + "/friend_requests");
  const friendRequests = (await response.data) as Array<IFriendRequest>;
  return friendRequests;
};

export const createFriendRequest = async (userId: string) => {
  const response = await axios.post(API_URL + "/friend_requests", userId);
  const friendRequests = (await response.data) as IFriendRequest;
  return friendRequests;
};
