import React, { useEffect } from "react";

import MatchTemplate from "@templates/MatchTemplate";
import AuthStore from "@store/auth";
import MatchStore from "@store/match";

export const MatchPage: React.FC = () => {
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
  return (
    <>
      <MatchTemplate />
    </>
  );
};
