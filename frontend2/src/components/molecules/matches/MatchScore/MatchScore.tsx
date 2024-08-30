import { useGetMatchScoresQuery } from "@redux/api/matchScoreApi";
import { IMatch } from "@schemas/match";
import React, { useState } from "react";

interface IMatchScoreProps {
  match: IMatch;
}

export const MatchScore: React.FC<IMatchScoreProps> = ({ match }) => {
  const { data, isLoading } = useGetMatchScoresQuery(match.id);
  const [isShow, setIsShow] = useState(false);
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
      <div
        onClick={() => setIsShow((prev) => !prev)}
        className="mt-5 mb-5 text-highlight"
      >
        {!isShow ? "Show" : "Close"} match set score
      </div>
      {!isLoading && isShow && data && (
        <>
          {data.map((scores, index) => (
            <div key={scores.id} className="relative">
              <div className="mt-2 absolute top-[12px]">#{index + 1}</div>

              <div className="flex justify-between items-center">
                <div className="w-[48%] flex justify-end">
                  <div className="w-[70px] mt-3 mr-2">
                    <div className="text-[24px]  text-end">
                      {scores.first_team_score}
                    </div>
                  </div>
                </div>
                <div className="w-[1px] h-[60px] bg-fg"></div>

                <div className="w-[50%] ">
                  <div className="w-[70px] mt-3 ml-2">
                    <div className="text-[24px]">
                      {scores.second_team_score}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};
