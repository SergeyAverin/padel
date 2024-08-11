import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTags = async () => {
  const res = await axios.get(API_URL + "/tags", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tags = await res.data;
  return tags;
};

export const getFriendTags = async (userId: string) => {
  const res = await axios.get(API_URL + `/tags/friends/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tags = await res.data;
  return tags;
};

export const addTag = async (userId: string, tagId: number) => {
  await axios.post(API_URL + `/tags/friends/${userId}`, tagId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const removeTag = async (userId: string, tagId: number) => {
  await axios.delete(API_URL + `/tags/friends/${userId}`, {
    data: tagId,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteTag = async (tagId: number) => {
  await axios.delete(API_URL + `/tags/${tagId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createTag = async (tagName: string) => {
  await axios.post(API_URL + "/tags", tagName, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
