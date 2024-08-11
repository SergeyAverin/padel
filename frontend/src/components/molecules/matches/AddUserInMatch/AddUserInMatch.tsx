import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import AddUserInMatchLocal from "@store/matches/addUserInMatchLocal";

import React from "react";

interface IAddUserInMatchProps {
  match: IMatch;
  index: number;
  userStore: AddUserInMatchLocal;
}

export const AddUserInMatch: React.FC<IAddUserInMatchProps> = ({
  match,
  index,
  userStore,
}) => {
  const onClick = useAddUserInMatch(match, index, userStore, true);
  return (
    <>
      <div className="flex items-center" onClick={onClick}>
        <div className="w-[42px] h-[42px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
          +
        </div>
        <div className="ml-2 text-[14px]">Add user</div>
      </div>
    </>
  );
};
