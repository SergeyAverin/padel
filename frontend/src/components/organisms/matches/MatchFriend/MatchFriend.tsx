import { Heading, HeadingVariant } from "@atoms/index";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import Match from "@organisms/matches/Match";
import React from "react";
import { observer } from "mobx-react-lite";

import MatchStore from "@store/match";

export const MatchFriend: React.FC = observer(() => {
  return (
    <>
      {MatchStore.matchesFromFriends.length == 0 && (
        <EmptyBanner text="Your friends have not matches" />
      )}
      {MatchStore.matchesFromFriends.length != 0 && (
        <div className="mt-5">
          <Heading variant={HeadingVariant.H2}>Match from friends</Heading>
          {MatchStore.matchesFromFriends.map((match) => (
            <div className="mt-3" key={match.id}>
              <Match />
            </div>
          ))}
        </div>
      )}
    </>
  );
});
