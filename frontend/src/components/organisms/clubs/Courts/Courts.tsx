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
  const deleteCourt = (courtId: number) => {
    CourtStore.deleteCourt(courtId);
  };
  return (
    <div>
      Courts
      {CourtStore.courts.map((court) => (
        <div className="flex justify-between">
          <div>{court.name}</div>
          <div onClick={() => deleteCourt(court.id)}>Delete</div>
        </div>
      ))}
    </div>
  );
});
