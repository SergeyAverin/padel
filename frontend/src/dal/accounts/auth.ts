import axiosInstance from "../axiosInstance";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (userId: string) => {
  const res = await axiosInstance.post(`${API_URL}/auth/login`, userId);
  const data = await res.data;
  localStorage.setItem("token", data.access_token);
};
