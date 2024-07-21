import React, { useReducer, useRef } from "react";

import TestPhoto from "@assets/TestPhoto.png";
import { useDrag } from "react-dnd";
import { IUser } from "@schemas/user";
import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import AddUserInMatch from "@store/addUserInMatch";

interface IUserInMatchProps {
  user: IUser;
  match: IMatch;
  index: number;
}

export const UserInMatch: React.FC<IUserInMatchProps> = ({
  user,
  match,
  index,
}) => {
  const onClick = useAddUserInMatch(match, index);

  return (
    <>
      <div
        className="flex flex-col justify-center"
        onClick={() => {
          onClick();
        }}
      >
        <img src={TestPhoto} className="rounded-full w-[60px] h-[60px]" />
        <div className="text-[12px] text-center mt-2">{user.username}</div>
        <div className="text-[12px] text-center mt-1">{user.age}</div>
      </div>
    </>
  );
};
