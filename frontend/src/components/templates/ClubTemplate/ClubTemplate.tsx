import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant } from "@atoms/index";
import ClubStore from "@store/club";
import MatchStore from "@store/match";

import AddressIcon from "@assets/AddressIcon.svg?react";

export const ClubTemplate: React.FC = observer(() => {
  useEffect(() => {
    if (ClubStore.openedClub) {
      MatchStore.loadClubMatches(ClubStore.openedClub?.id);
    }
  }, [ClubStore.openedClub]);
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>
        {ClubStore.openedClub?.name}
      </Heading>
      <div className="flex w-full  items-center">
        <AddressIcon />
        <div className="text-[12px] font-medium ml-3">
          {ClubStore.openedClub?.address}
        </div>
      </div>
      <div>
        {MatchStore.matches.map((match) => (
          <div>{match.id}</div>
        ))}
      </div>
    </div>
  );
});
