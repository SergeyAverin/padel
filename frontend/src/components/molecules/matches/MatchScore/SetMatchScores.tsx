import React from "react";
import SelectScore from "../SelectScore";
import { IMatch } from "@schemas/match";

interface ISetMatchScoresProps {
  match: IMatch;
}
export const SetMatchScores: React.FC<ISetMatchScoresProps> = ({ match }) => {
  return (
    <>
      <hr className="" />
      <div className="flex justify-between items-center">
        <div className="w-[48%] flex justify-end">
          <div className="w-[70px] mt-3 mr-2">
            <SelectScore
              team={1}
              defaultScore={match.first_team_score}
              matchId={match.id}
            />
          </div>
        </div>
        <div className="w-[1px] h-[60px] bg-fg"></div>

        <div className="w-[50%] ">
          <div className="w-[70px] mt-3 ml-2">
            <SelectScore
              team={2}
              defaultScore={match.second_team_score}
              matchId={match.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};
