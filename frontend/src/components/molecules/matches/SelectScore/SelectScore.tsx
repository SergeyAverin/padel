import React from "react";

import Select from "@atoms/Select";
import MatchStore from "@store/match";

const scores = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
];

interface ISelectScoreProps {
  matchId: number;
  defaultScore: number;
  team: number;
}

export const SelectScore: React.FC<ISelectScoreProps> = ({
  matchId,
  defaultScore,
  team,
}) => {
  const onChange = (item: { label: string; value: string }) => {
    MatchStore.changeScore(matchId, team, Number(item.value));
  };
  return (
    <>
      <Select
        onChange={onChange}
        defaultValue={scores[defaultScore]}
        options={scores}
      />
    </>
  );
};
