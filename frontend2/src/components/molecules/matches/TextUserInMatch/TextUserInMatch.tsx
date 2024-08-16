import { IMatch } from "@schemas/match";
import { shortenString } from "@utils/shoringString";
import React from "react";
import TestUserPhoto from "@assets/TestPhoto.png";
import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import classNames from "classnames";

interface ITextUserInMatchProps {
  text: string;
  match: IMatch;
  index: number;
  isRevers: boolean;
}

export const TextUserInMatch: React.FC<ITextUserInMatchProps> = ({
  text,
  index,
  match,
  isRevers = false,
}) => {
  const onClick = useAddUserInMatch(match, index);

  return (
    <div
      className={classNames("flex", {
        "flex-row-reverse": isRevers,
      })}
      onClick={() => {
        onClick();
      }}
    >
      <img className="w-[42px] h-[42px] rounded-full" src={TestUserPhoto} />

      <div
        className={classNames("text-[14px] mt-2", {
          "mr-1": isRevers,
          "mrl-1": !isRevers,
        })}
      >
        {shortenString(text, 12)}
      </div>
    </div>
  );
};
