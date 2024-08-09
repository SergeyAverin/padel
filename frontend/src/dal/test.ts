import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const testHello = async () => {
  const res = await axios.get(API_URL + "/hello");
  const data = await res.data;
  return data.message;
};
