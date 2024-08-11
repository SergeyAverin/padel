import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import CourtStore from "@store/clubs/courts";
import ClubStore from "@store/clubs/club";
import { Button, ButtonVariant, Input } from "@atoms/index";
import HelpBanner from "@organisms/core/HelpBanner";

export const Courts: React.FC = observer(() => {
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
      <HelpBanner isInNavigation={true} localStorageKey="help_add_court">
        Here you can add the court of your club so that users can add matches in
        the discarded court
      </HelpBanner>
      <form onSubmit={createCourt}>
        <div className="mt-5">
          <Input
            name="court_name"
            value={courtName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourtName(e.target.value)
            }
          />
          <div className="mt-2"></div>
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Add court
          </Button>
        </div>
      </form>
      {CourtStore.courts.length != 0 && (
        <table className="min-w-full border-collapse border border-gray-200 mt-5">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {CourtStore.courts.map((court) => (
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {court.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div onClick={() => deleteCourt(court.id)}>
                    <Button variant={ButtonVariant.DANGER}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
});
