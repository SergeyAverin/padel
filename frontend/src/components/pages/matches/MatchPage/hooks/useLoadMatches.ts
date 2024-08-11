import AuthStore from "@store/account/auth";
import MatchStore from "@store/matches/match";
import { useEffect } from "react";

export const useLoadMatches = () => {
  useEffect(() => {
    if (AuthStore.authUser?.telegram_user_id) {
      MatchStore.loadingMatch();
    }
    return () => {
      MatchStore.matches = [];
      MatchStore.matchesFromBookmarks = [];
      MatchStore.matchesFromFriends = [];
    };
  }, [AuthStore.authUser]);
};
