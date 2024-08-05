import { Heading, HeadingVariant } from "@atoms/index";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import Match from "@organisms/matches/Match";
import React from "react";

import MatchStore from "@store/match";
import { observer } from "mobx-react-lite";
import HelpBanner from "@organisms/HelpBanner";

export const MatchUser: React.FC = observer(() => {
  return (
    <>
      {MatchStore.matches.length == 0 && (
        <EmptyBanner text="You have not matches" />
      )}
      {MatchStore.matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>Your match</Heading>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_status">
              If you own the match you can change the status of the match and if
              the match is completed you can change the match score. And you can
              choose the users who will be in your match.
            </HelpBanner>
          </div>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_join">
              You can enter open matches if your level matches the level of the
              match.
            </HelpBanner>
          </div>
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
