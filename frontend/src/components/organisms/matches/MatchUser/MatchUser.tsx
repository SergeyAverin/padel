import { Heading, HeadingVariant } from "@atoms/index";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import Match from "@organisms/matches/Match";
import React from "react";

import MatchStore from "@store/match";
import { observer } from "mobx-react-lite";

export const MatchUser: React.FC = observer(() => {
  return (
    <>
      {MatchStore.matches.length == 0 && (
        <EmptyBanner text="You have not matches" />
      )}
      {MatchStore.matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>Your match</Heading>
          {MatchStore.matches.map((match) => (
            <div className="mt-3" key={match.id}>
              <Match match={match} />
            </div>
          ))}
        </div>
      )}
    </>
  );
});
