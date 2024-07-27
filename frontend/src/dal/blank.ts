import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMatchWithOutBlank = async () => {
  const matchResponse = await axios.get(API_URL + `/match_with_out_blank`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const match = await matchResponse.data;
  return match;
};
