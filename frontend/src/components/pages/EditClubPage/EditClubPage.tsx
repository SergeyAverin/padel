import EditClubTemplate from "@templates/EditClubTemplate";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClubStore from "@store/club";
import { observer } from "mobx-react-lite";
import { Spinner } from "@atoms/index";
import CourtStore from "@store/courts";

export const EditClubPage: React.FC = observer(() => {
  const { clubId } = useParams();
  useEffect(() => {
    if (clubId) {
      ClubStore.openClub(clubId);
      ClubStore.loadClubPhotos(Number(clubId));
      CourtStore.getCourts(Number(clubId));
    }
  }, []);
  return (
    <>
      <>{ClubStore.openedClub ? <EditClubTemplate /> : <Spinner />}</>
    </>
  );
});
