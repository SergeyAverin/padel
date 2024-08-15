import { useAuthUser } from "@hooks/useAuthUser";
import MatchInfo from "@molecules/matches/MatchInfo";
import { MatchLinks } from "@molecules/matches/MatchLinks/MatchLinks";
import { MatchScore } from "@molecules/matches/MatchScore/MatchScore";
import { SetMatchScores } from "@molecules/matches/MatchScore/SetMatchScores";
import SetMatchStatus from "@molecules/matches/SetMatchStatus";
import { IMatch } from "@schemas/match";
import { IUser } from "@schemas/user";
import React from "react";

interface IMatchProps {
  match: IMatch;
}

export const Match: React.FC<IMatchProps> = ({ match }) => {
  const user = useAuthUser() as IUser;
  const permission =
    user.id == match.owner?.id ||
    user.id == match.club?.owner_id ||
    user.status == "super_admin";
  console.log(match);
  return (
    <div className="bg-primary p-5 rounded-2xl animate-fade-in">
      <div className="flex justify-between items-start">
        <MatchInfo match={match} />
        {permission ? (
          <SetMatchStatus match={match} />
        ) : (
          <div>{match.status}</div>
        )}
      </div>
      <div>
        <MatchLinks match={match} />
      </div>
      {/** users */}
      <div>
        {permission ? (
          <SetMatchScores match={match} />
        ) : (
          <MatchScore match={match} />
        )}
      </div>
    </div>
  );
};
