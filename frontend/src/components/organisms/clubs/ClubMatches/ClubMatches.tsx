import { Loading } from "@atoms/index";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import React from "react";
import MatchStore from "@store/matches/match";
import Match from "@organisms/matches/Match";
import { observer } from "mobx-react-lite";

export const ClubMatches: React.FC = observer(() => {
  return (
    <div>
      {MatchStore.isLoadingFromClub && (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      )}

      <div>
        {MatchStore.matches
          .slice(0)
          .reverse()
          .map((match) => (
            <div key={match.id} className="mt-5">
              <Match match={match} />
            </div>
          ))}
        {MatchStore.matches.length == 0 && !MatchStore.isLoadingFromClub && (
          <EmptyBanner text="Club have not matches" />
        )}
      </div>
    </div>
  );
});
