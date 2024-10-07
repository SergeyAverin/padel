import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import classNames from "classnames";

import React from "react";

interface IAddUserInMatchProps {
  match: IMatch | null;
  index: number;
  isReverse?: boolean;
}

export const AddUserInMatch: React.FC<IAddUserInMatchProps> = ({
  match,
  index,
  isReverse = false,
}) => {
  const onClick = useAddUserInMatch(match, index, true);

  return (
    <>
      <div
        className={classNames("flex items-center", {
          "flex-row-reverse": isReverse,
        })}
        onClick={onClick}
      >
        <div className="w-[42px] h-[42px] border-2 border-highlight text-highlight rounded-full border-dashed flex justify-center items-center">
          +
        </div>
        <div
          className={classNames(" text-[14px]", {
            "mr-2": isReverse,
            "ml-2": !isReverse,
          })}
        >
          Add user
        </div>
      </div>
    </>
  );
};
