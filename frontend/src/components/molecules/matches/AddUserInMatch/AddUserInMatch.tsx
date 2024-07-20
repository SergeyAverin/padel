import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";

import React from "react";

interface IAddUserInMatchProps {
  match: IMatch;
}

export const AddUserInMatch: React.FC<IAddUserInMatchProps> = ({ match }) => {
  const onClick = useAddUserInMatch(match, true);
  return (
    <>
      <div className="flex flex-col justify-center p-2" onClick={onClick}>
        <div className="w-[60px] h-[60px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
          +
        </div>
        <div className="text-[12px] text-center mt-2">1</div>
        <div className="text-[12px] text-center mt-1">1</div>
      </div>
    </>
  );
};
