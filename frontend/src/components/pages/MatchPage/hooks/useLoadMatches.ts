import AuthStore from "@store/auth";
import MatchStore from "@store/match";
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
