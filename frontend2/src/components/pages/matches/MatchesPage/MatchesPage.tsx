import { useAuthUser } from "@hooks/useAuthUser";
import Tabs from "@molecules/core/Tabs";
import HelpBanner from "@organisms/core/HelpBanner";
import AllGamesTemplate from "@templates/matches/AllGamesTemplate";
import GameToJoin from "@templates/matches/GameToJoin";
import MatchClubTemplate from "@templates/matches/MatchClubTemplate";
import MatchFriendTemplate from "@templates/matches/MatchFriendTemplate";
import MatchUserTemplate from "@templates/matches/MatchUserTemplate";
import React from "react";

export const MatchesPage: React.FC = () => {
  const user = useAuthUser();
  const tabs = [
    {
      to: "#Join",
      text: "Games",
      content: <GameToJoin />,
    },
    {
      to: "#all",
      text: "All",
      content: <AllGamesTemplate />,
    },
    {
      to: "#your",
      text: "My games",
      content: (
        <MatchUserTemplate
          isMatchPage={true}
          userId={user?.telegram_user_id as string}
        />
      ),
    },
    {
      to: "#friends",
      text: "Friends",
      content: <MatchFriendTemplate />,
    },
    {
      to: "#clubs",
      text: "by Clubs",
      content: <MatchClubTemplate />,
    },
  ];
  return (
    <>
      <div className="p-2">
        <Tabs subTab={tabs} />

        <HelpBanner localStorageKey="help_match" isInNavigation={true}>
          On this page will be displayed games in which you, your friends or
          games of clubs from your bookmarks
        </HelpBanner>
      </div>
    </>
  );
};
