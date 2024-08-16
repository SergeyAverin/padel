import { useAuthUser } from "@hooks/useAuthUser";
import MatchInfo from "@molecules/matches/MatchInfo";
import { MatchLinks } from "@molecules/matches/MatchLinks/MatchLinks";
import { MatchScore } from "@molecules/matches/MatchScore/MatchScore";
import { SetMatchScores } from "@molecules/matches/MatchScore/SetMatchScores";
import SetMatchStatus from "@molecules/matches/SetMatchStatus";
import { IMatch } from "@schemas/match";
import { IUser } from "@schemas/user";
import React from "react";
import { UserWrapper } from "./UserWrapper";

interface IMatchProps {
  match: IMatch;
}

export const Match: React.FC<IMatchProps> = ({ match }) => {
  const user = useAuthUser() as IUser;
  const permission =
    user.id == match.owner?.id ||
    user.id == match.club?.owner_id ||
    user.status == "super_admin";
  return (
    <div className="bg-primary p-5 rounded-2xl animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <MatchLinks match={match} />
        </div>
        {permission ? (
          <SetMatchStatus match={match} />
        ) : (
          <div>{match.status}</div>
        )}
      </div>
      <hr className="mt-5" />
      <div className="flex  justify-around items-start">
        <div className="w-[50%] mt-4 mb-4">
          <UserWrapper
            user={match.user_1}
            index={1}
            match={match}
            userText={match.text_user_1}
          />
          <div className="mt-5">
            <UserWrapper
              user={match.user_2}
              index={2}
              match={match}
              userText={match.text_user_2}
            />
          </div>
        </div>

        <div className="w-[1px] h-[140px] bg-fg"></div>
        <div className="w-[50%] mt-4 mb-4 ml-2">
          <UserWrapper
            user={match.user_3}
            index={3}
            match={match}
            userText={match.text_user_3}
            isReverse={true}
          />
          <div className="mt-5">
            <UserWrapper
              user={match.user_4}
              index={4}
              match={match}
              userText={match.text_user_4}
              isReverse={true}
            />
          </div>
        </div>
      </div>
      <div>
        {match.status == "done" && (
          <>
            {permission ? (
              <SetMatchScores match={match} />
            ) : (
              <MatchScore match={match} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
