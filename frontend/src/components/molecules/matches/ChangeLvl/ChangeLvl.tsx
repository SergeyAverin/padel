import { getChangeLvl } from "@dal/matches/blank";
import React, { useEffect, useState } from "react";

interface IChangeLvlProps {
  matchId: number;
}
export const ChangeLvl: React.FC<IChangeLvlProps> = ({ matchId }) => {
  const [lvl, setLvl] = useState(0);
  useEffect(() => {
    getChangeLvl(matchId).then((res) => {
      setLvl(res);
    });
  }, [matchId]);
  return <>{lvl}</>;
};
