import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMatchByUserId = async (userId: string) => {
  const res = await axios.get(API_URL + `/user/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};
export const getMatchByClubId = async (clubId: number) => {
  const res = await axios.get(API_URL + `/club/${clubId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};

export const getMatchesFromUserFriends = async (userId: string) => {
  const res = await axios.get(API_URL + `/friends/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};

export const getMatchesFromBookmarkedClubs = async (userId: string) => {
  const res = await axios.get(API_URL + `/bookmark/${userId}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const matches = await res.data;
  return matches;
};

export const changeStatus = async (matchId: number, newStatus: string) => {
  await axios.put(API_URL + `/matches/${matchId}/status`, newStatus, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const changeScore = async (
  matchId: number,
  team: number,
  score: number
) => {
  await axios.put(
    API_URL + `/matches/${matchId}/score`,
    {
      score,
      team,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const getMatchByDay = async (
  clubId: number,
  day: number,
  month: number
) => {
  const res = await axios.get(
    API_URL + `/matches/${clubId}/by_day?month=${month}&day=${day}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const matches = await res.data;
  return matches;
};

export const createMatch = async (
  startAt: Date,
  endAt: Date,
  clubId: number,
  courtId: number,
  match_lvl: string,
  isPrivate: boolean,
  selectedTagId: number | null
) => {
  const res = await axios.post(
    API_URL + `/matches`,
    {
      start_at: startAt,
      end_at: endAt,
      club_id: clubId,
      court_id: courtId,
      match_lvl: match_lvl,
      is_private: isPrivate,
      tag_id: selectedTagId ? selectedTagId : 0,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const matches = await res.data;
  return matches;
};
