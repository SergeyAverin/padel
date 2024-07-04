import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ClubStore from "@store/club";

export const useLoadingClubById = () => {
  const { clubId } = useParams();
  useEffect(() => {
    if (clubId) {
      ClubStore.openClub(clubId);
    }
  }, []);
};
