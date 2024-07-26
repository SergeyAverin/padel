import axiosInstance from "./axiosInstance";

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
