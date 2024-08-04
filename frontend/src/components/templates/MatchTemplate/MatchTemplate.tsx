import React from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Tabs from "@molecules/Tabs";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import MatchUser from "@organisms/matches/MatchUser";
import { MatchFriend } from "@organisms/matches/MatchFriend/MatchFriend";
import MatchClub from "@organisms/matches/MatchClub";
import MatchStore from "@store/match";

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
            <div className="flex flex-col items-center justify-center">
              {/* Show if user have not matches */}
              <Heading variant={HeadingVariant.H2}>
                You have not matches
              </Heading>
              <div className="mt-5">
                <EmptyBanner text="Empty" />
              </div>
            </div>
          ) : (
            <>
              {/* Show matches */}
              <Tabs subTab={tabs} />
            </>
          )}
        </>
      )}
    </div>
  );
});
