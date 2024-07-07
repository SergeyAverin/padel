import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import MatchStore from "@store/match";
import { Heading, HeadingVariant } from "@atoms/index";
import Match from "@organisms/matches/Match";

export const MatchTemplate: React.FC = observer(() => {
  useEffect(() => {
    MatchStore.loadFriendsMatches("3");
    MatchStore.loadUserMatches("3");
    MatchStore.loadMatchesFromBookmarkedClubs("3");
  }, []);
  return (
    <div className="p-5">
      <div>
        <Heading variant={HeadingVariant.H2}>Your match</Heading>
        {MatchStore.matchesFromFriends.map((match) => (
          <div className="mt-3" key={match.id}>
            <Match />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Heading variant={HeadingVariant.H2}>Match from friends</Heading>
        {MatchStore.matchesFromFriends.map((match) => (
          <div className="mt-3" key={match.id}>
            <Match />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Heading variant={HeadingVariant.H2}>
          Match from bookmarked clubs
        </Heading>
        {MatchStore.matchesFromBookmarks.map((match) => (
          <div className="mt-3" key={match.id}>
            <Match />
          </div>
        ))}
      </div>
    </div>
  );
});
