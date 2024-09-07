import { useAuthUser } from "@hooks/useAuthUser";
import Tabs from "@molecules/core/Tabs";
import HelpBanner from "@organisms/core/HelpBanner";
import MatchClubTemplate from "@templates/matches/MatchClubTemplate";
import MatchFriendTemplate from "@templates/matches/MatchFriendTemplate";
import MatchUserTemplate from "@templates/matches/MatchUserTemplate";
import React from "react";

export const MatchesPage: React.FC = () => {
  const user = useAuthUser();
  const tabs = [
    {
      to: "#all",
      text: "All",
      content: <div>all</div>,
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
          On this page will be displayed matches in which you, your friends or
          matches of clubs from your bookmarks
        </HelpBanner>
      </div>
    </>
  );
};
