import React, { useState } from "react";
import SelectScore from "../SelectScore";
import { IMatch } from "@schemas/match";
import {
  useCreateMatchScoreMutation,
  useDeleteMatchScoreMutation,
  useGetMatchScoresQuery,
} from "@redux/api/matchScoreApi";

import TrashIcon from "@assets/TrashIcon.svg?react";

interface ISetMatchScoresProps {
  match: IMatch;
}
export const SetMatchScores: React.FC<ISetMatchScoresProps> = ({ match }) => {
  const { data, isLoading } = useGetMatchScoresQuery(match.id);
  const [createMatchScore] = useCreateMatchScoreMutation();
  const [deleteMatchScore] = useDeleteMatchScoreMutation();
  const [isShow, setIsShow] = useState(false);
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
      <div
        onClick={() => setIsShow((prev) => !prev)}
        className="mt-5 text-highlight"
      >
        {!isShow ? "Show" : "Close"} match set score
      </div>

      {!isLoading && isShow && data && (
        <>
          <div
            onClick={() => createMatchScore(match.id)}
            className="mt-3 mb-3 text-highlight"
          >
            + Add score set
          </div>

          {data.map((scores, index) => (
            <div key={scores.id} className="relative">
              <div className="mt-2 absolute top-[12px]">#{index + 1}</div>

              <div className="flex justify-between items-center">
                <div className="w-[48%] flex justify-end items-center">
                  <div
                    className="stroke-fg fill-fg mr-3 mt-2"
                    onClick={() => deleteMatchScore(scores.id)}
                  >
                    <TrashIcon />
                  </div>
                  <div className="w-[70px] mt-3 mr-2">
                    <SelectScore
                      team={1}
                      defaultScore={scores.first_team_score}
                      matchId={scores.id}
                      isScoreSet={true}
                    />
                  </div>
                </div>
                <div className="w-[1px] h-[60px] bg-fg"></div>

                <div className="w-[50%] ">
                  <div className="w-[70px] mt-3 ml-2">
                    <SelectScore
                      team={2}
                      defaultScore={scores.second_team_score}
                      matchId={scores.id}
                      isScoreSet={true}
                    />
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
