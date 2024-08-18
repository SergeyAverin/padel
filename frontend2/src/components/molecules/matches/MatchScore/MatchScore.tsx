import { IMatch } from "@schemas/match";
import React from "react";

interface IMatchScoreProps {
  match: IMatch;
}

export const MatchScore: React.FC<IMatchScoreProps> = ({ match }) => {
  return (
    <>
      <hr />
      <div className="flex justify-between items-center">
        <div className="w-[48%] flex justify-end">
          <div className="w-[70px] mt-3 mr-2">
            <div className="text-[24px]  text-end">
              {match.first_team_score}
            </div>
          </div>
        </div>
        <div className="w-[1px] h-[60px] bg-fg"></div>

        <div className="w-[50%] ">
          <div className="w-[70px] mt-3 ml-2">
            <div className="text-[24px]">{match.second_team_score}</div>
          </div>
        </div>
      </div>
    </>
  );
};
