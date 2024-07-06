import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTags = async () => {
  const res = await axios.get(API_URL + "/tags");
  const tags = await res.data;
  return tags;
};

export const getFriendTags = async (userId: string) => {
  const res = await axios.get(API_URL + `/tags/friends/${userId}`);
  const tags = await res.data;
  return tags;
};
