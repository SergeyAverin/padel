import axiosInstance from "../axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const addUserInMatch = async (
  matchId: number,
  userId: string,
  userIndex: number
) => {
  await axiosInstance.put(
    `${API_URL}/matches/${matchId}`,
    {
      user_id: userId,
      user_index: userIndex,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const addTestUserInMatch = async (
  matchId: number,
  text: string,
  userIndex: number
) => {
  await axiosInstance.put(
    `${API_URL}/matches/${matchId}`,
    {
      text_user: text,
      user_index: userIndex,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getUserToAddInMatch = async (matchId: number) => {
  const res = await axiosInstance.get(
    API_URL + `/matches/${matchId}/users_for_match`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await res.data;
  return data;
};
