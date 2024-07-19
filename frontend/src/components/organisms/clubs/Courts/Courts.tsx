import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import CourtStore from "@store/courts";
import ClubStore from "@store/club";

export const Courts: React.FC = observer(() => {
  useEffect(() => {
    if (ClubStore.openedClub) {
      CourtStore.getCourts(ClubStore.openedClub.id);
    }
  }, [ClubStore.openedClub]);
  return (
    <div>
      Courts
      {CourtStore.courts.map((court) => (
        <div>{court.name}</div>
      ))}
    </div>
  );
});
