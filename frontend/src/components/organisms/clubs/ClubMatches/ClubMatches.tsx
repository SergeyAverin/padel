import { Loading } from "@atoms/index";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import React from "react";
import MatchStore from "@store/match";
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
        {MatchStore.matches.map((match) => (
          <div key={match.id} className="mt-5">
            <Match />
          </div>
        ))}
        {MatchStore.matches.length == 0 && (
          <EmptyBanner text="Club have not matches" />
        )}
      </div>
    </div>
  );
});
