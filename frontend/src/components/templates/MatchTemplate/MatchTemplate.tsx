import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import MatchStore from "@store/match";
import { Heading, HeadingVariant } from "@atoms/index";
import Match from "@organisms/matches/Match";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import AuthStore from "@store/auth";

export const MatchTemplate: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser) {
      MatchStore.loadFriendsMatches(AuthStore.authUser.telegram_user_id);
      MatchStore.loadUserMatches(AuthStore.authUser.telegram_user_id);
      MatchStore.loadMatchesFromBookmarkedClubs(
        AuthStore.authUser.telegram_user_id
      );
    }
  }, [AuthStore.authUser]);
  return (
    <div className="p-5">
      {MatchStore.matchesFromFriends.length == 0 &&
      MatchStore.matchesFromBookmarks.length == 0 &&
      MatchStore.matches.length == 0 ? (
        <>
          <Heading variant={HeadingVariant.H2}>Matches not found</Heading>
          <EmptyBanner />
        </>
      ) : (
        <>
          <div>
            <Heading variant={HeadingVariant.H2}>Your match</Heading>
            {MatchStore.matches.map((match) => (
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
        </>
      )}
    </div>
  );
});
