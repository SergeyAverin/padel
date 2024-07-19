import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ClubStore from "@store/club";
import MatchStore from "@store/match";

export const useLoadingClubById = () => {
  const { clubId } = useParams();
  useEffect(() => {
    if (clubId) {
      ClubStore.openClub(clubId);
      MatchStore.loadClubMatches(Number(clubId));
      ClubStore.loadClubPhotos(Number(clubId));
    }
    return () => {
      ClubStore.openedClub = null;
      MatchStore.matches = [];
      ClubStore.clubPhotos = [];
    };
  }, [clubId]);
};
