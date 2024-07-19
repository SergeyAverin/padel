import EditClubTemplate from "@templates/EditClubTemplate";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClubStore from "@store/club";
import { observer } from "mobx-react-lite";
import { Spinner } from "@atoms/index";

export const EditClubPage: React.FC = observer(() => {
  const { clubId } = useParams();
  useEffect(() => {
    if (clubId) {
      ClubStore.openClub(clubId);
    }
  }, []);
  // useEffect(() => {
  //   return () => {
  //     ClubStore.openedClub = null;
  //   };
  // }, []);
  return (
    <>
      <>{ClubStore.openedClub ? <EditClubTemplate /> : <Spinner />}</>
    </>
  );
});
