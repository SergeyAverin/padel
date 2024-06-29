import axios from "axios";

import { IFriendRequest } from "src/types/friendRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const getFriendRequests = async () => {
  const response = await axios.get(API_URL + "/friend_requests");
  const friendRequests = (await response.data) as Array<IFriendRequest>;
  return friendRequests;
};
