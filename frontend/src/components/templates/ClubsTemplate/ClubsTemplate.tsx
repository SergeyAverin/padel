import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant } from "@atoms/index";
import ClubStore from "@store/club";
import Club from "@organisms/clubs/Club";

export const ClubsTemplate: React.FC = observer(() => {
  useEffect(() => {
    ClubStore.getClubs();
  }, []);

  return (
    <div className="p-3">
      <Heading variant={HeadingVariant.H2}>Clubs</Heading>
      <div className="grid grid-cols-2 gap-2 mt-5">
        {ClubStore.clubs.map((club) => (
          <Club club={club} key={club.id} />
        ))}
      </div>
      {ClubStore.bookmarkedClubs.length > 0 && (
        <>
          <div className="mt-5">
            <Heading variant={HeadingVariant.H2}>Bookmarked clubs</Heading>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            {ClubStore.bookmarkedClubs.map((club) => (
              <Club club={club} key={club.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
