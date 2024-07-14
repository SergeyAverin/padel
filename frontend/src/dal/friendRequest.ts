import axios from "axios";

import { IFriendRequest } from "@schemas/friendRequest";

const API_URL = import.meta.env.VITE_API_URL;

export const getInnerFriendRequests = async () => {
  const response = await axios.get(API_URL + "/friend_requests/inner", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const friendRequests = (await response.data) as Array<IFriendRequest>;
  return friendRequests;
};

export const getOuterFriendRequests = async () => {
  const response = await axios.get(API_URL + "/friend_requests/outer", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const friendRequests = (await response.data) as Array<IFriendRequest>;
  return friendRequests;
};

export const createFriendRequest = async (userId: string) => {
  const response = await axios.post(API_URL + "/friend_requests", userId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const friendRequests = (await response.data) as IFriendRequest;
  return friendRequests;
};

export const acceptFriendRequest = async (friendRequestId: number) => {
  await axios.post(
    API_URL + `/friend_requests/${friendRequestId}/accept`,
    friendRequestId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const rejectFriendRequest = async (friendRequestId: number) => {
  await axios.post(
    API_URL + `/friend_requests/${friendRequestId}/reject`,
    friendRequestId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const cancelFriendRequest = async (friendRequestId: number) => {
  console.log(friendRequestId);
  await axios.post(
    API_URL + `/friend_requests/${friendRequestId}/cancel`,
    friendRequestId,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
