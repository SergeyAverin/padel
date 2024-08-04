import React from "react";
import { observer } from "mobx-react-lite";

import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import Tabs from "@molecules/Tabs";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import MatchUser from "@organisms/matches/MatchUser";
import { MatchFriend } from "@organisms/matches/MatchFriend/MatchFriend";
import MatchClub from "@organisms/matches/MatchClub";
import MatchStore from "@store/match";
import HelpBanner from "@organisms/HelpBanner";

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
              <div className="mt-5">
                <EmptyBanner text="You don't have any matches yet." />
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
      <HelpBanner localStorageKey="help_match" isInNavigation={true}>
        On this page will be displayed matches in which you, your friends or
        matches of clubs from your bookmarks
      </HelpBanner>
    </div>
  );
});
