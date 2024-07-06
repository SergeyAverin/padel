import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant } from "@atoms/index";
import Match from "@organisms/matches/Match";
import ClubStore from "@store/club";
import MatchStore from "@store/match";

import AddressIcon from "@assets/AddressIcon.svg?react";
import Tabs from "@molecules/Tabs";

export const ClubTemplate: React.FC = observer(() => {
  useEffect(() => {
    if (ClubStore.openedClub) {
      MatchStore.loadClubMatches(ClubStore.openedClub?.id);
    }
  }, [ClubStore.openedClub]);
  const tabs = [
    {
      to: "#match",
      text: "match",
      content: (
        <div>
          {" "}
          <div>
            {MatchStore.matches.map((match) => (
              <div key={match.id} className="mt-5">
                <Match />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      to: "#booking",
      text: "Booking",
      content: <div>booking</div>,
    },
    {
      to: "#photos",
      text: "Photos",
      content: <div>photos</div>,
    },
  ];
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

      <Tabs subTab={tabs} />
    </div>
  );
});
