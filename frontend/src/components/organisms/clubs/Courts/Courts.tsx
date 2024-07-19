import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import CourtStore from "@store/courts";
import ClubStore from "@store/club";
import { Button, ButtonVariant, Input } from "@atoms/index";

export const Courts: React.FC = observer(() => {
  useEffect(() => {
    if (ClubStore.openedClub) {
      CourtStore.getCourts(ClubStore.openedClub.id);
    }
  }, [ClubStore.openedClub]);
  const deleteCourt = (courtId: number) => {
    CourtStore.deleteCourt(courtId);
  };
  const [courtName, setCourtName] = useState("");
  const createCourt = (e: React.FormEvent) => {
    e.preventDefault();
    if (ClubStore.openedClub) {
      CourtStore.createCourt(courtName, ClubStore.openedClub.id);
      setCourtName("");
    }
  };
  return (
    <div>
      Courts
      <form onSubmit={createCourt}>
        <Input
          name="court_name"
          value={courtName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCourtName(e.target.value)
          }
        />
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
          Add court
        </Button>
      </form>
      {CourtStore.courts.map((court) => (
        <div className="flex justify-between" key={court.id}>
          <div>{court.name}</div>
          <div onClick={() => deleteCourt(court.id)}>Delete</div>
        </div>
      ))}
    </div>
  );
});
