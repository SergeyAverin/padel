import React, { useState } from "react";

import Select from "@atoms/Select";
import { useSetScoreMutation } from "@redux/api/matchApi";
import { Option } from "@atoms/Select/selectOption";
import { useChangeMatchScoreMutation } from "@redux/api/matchScoreApi";

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
  isScoreSet?: boolean;
}

export const SelectScore: React.FC<ISelectScoreProps> = ({
  matchId,
  defaultScore,
  team,
  isScoreSet = false,
}) => {
  const a = scores.find((b) => Number(b.value) == defaultScore);
  const [score, setScoreLocal] = useState<Option>(a as Option);
  const [setScore] = useSetScoreMutation();
  const [changeMatchSecScore] = useChangeMatchScoreMutation();
  const onChange = (item: Option) => {
    if (!isScoreSet) {
      if (item) {
        setScoreLocal(item);
        setScore({
          matchId: matchId,
          score: Number(item.value),
          team: team,
        });
      }
    } else {
      changeMatchSecScore({
        match_score_id: matchId,
        score: Number(item.value),
        team: team,
      });
    }
  };
  return <Select onChange={onChange} defaultValue={score} options={scores} />;
};
