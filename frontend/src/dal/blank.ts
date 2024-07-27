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

export const createBlank = async (
  matchId: number,
  usre1: number,
  usre2: number,
  usre3: number,
  usre4: number
) => {
  const matchResponse = await axios.post(
    API_URL + `/match/${matchId}/blank`,
    {
      user_1: usre1,
      user_2: usre2,
      user_3: usre3,
      user_4: usre4,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const match = await matchResponse.data;
  return match;
};
