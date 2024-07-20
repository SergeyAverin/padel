import React from "react";
import { observer } from "mobx-react-lite";

import MatchStore from "@store/match";
import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Match from "@organisms/matches/Match";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import Tabs from "@molecules/Tabs";
import MatchUser from "@organisms/matches/MatchUser";
import { MatchFriend } from "@organisms/matches/MatchFriend/MatchFriend";
import MatchClub from "@organisms/matches/MatchClub";

export const MatchTemplate: React.FC = observer(() => {
  const tabs = [
    {
      to: "#your",
      text: "Your",
      content: <MatchUser />,
    },
    {
      to: "#friends",
      text: "Friends",
      content: <MatchFriend />,
    },
    {
      to: "#clubs",
      text: "Clubs",
      content: <MatchClub />,
    },
  ];
  return (
    <div className="p-5">
      {MatchStore.isLoading ? (
        <Spinner />
      ) : (
        <>
          {MatchStore.matchesFromFriends.length == 0 &&
          MatchStore.matchesFromBookmarks.length == 0 &&
          MatchStore.matches.length == 0 ? (
            <>
              <Heading variant={HeadingVariant.H2}>Matches not found</Heading>
              <EmptyBanner />
            </>
          ) : (
            <>
              <Tabs subTab={tabs} />
            </>
          )}
        </>
      )}
    </div>
  );
});
