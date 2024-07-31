import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import AddUserInMatchLocal from "@store/addUserInMatchLocal";
import { shortenString } from "@utils/shoringString";
import React from "react";
import TestUserPhoto from "@assets/TestPhoto.png";

interface ITextUserInMatchProps {
  text: string;
  match: IMatch;
  index: number;
  userStore: AddUserInMatchLocal;
}

export const TextUserInMatch: React.FC<ITextUserInMatchProps> = ({
  index,
  match,
  text,
  userStore,
}) => {
  const onClick = useAddUserInMatch(match, index, userStore);

  return (
    <div
      className="flex"
      onClick={() => {
        onClick();
      }}
    >
      <img className="w-[42px] h-[42px] rounded-full" src={TestUserPhoto} />

      <div className="text-[14px] mt-2 ml-1">{shortenString(text, 12)}</div>
    </div>
  );
};
