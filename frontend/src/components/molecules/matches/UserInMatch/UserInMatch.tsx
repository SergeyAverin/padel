import React from "react";

import { IUser } from "@schemas/user";
import { useAddUserInMatch } from "@hooks/useAddUserInMatch";
import { IMatch } from "@schemas/match";
import { shortenString } from "@utils/shoringString";
import AddUserInMatchLocal from "@store/addUserInMatchLocal";

interface IUserInMatchProps {
  user: IUser;
  match: IMatch;
  index: number;
  userStore: AddUserInMatchLocal;
}

export const UserInMatch: React.FC<IUserInMatchProps> = ({
  user,
  match,
  index,
  userStore,
}) => {
  const onClick = useAddUserInMatch(match, index, userStore);

  return (
    <>
      <div
        className="flex items-center"
        onClick={() => {
          onClick();
        }}
      >
        <img className="w-[42px] h-[42px] rounded-full" src={user.avatar} />

        <div className="text-[14px] ml-1">
          {shortenString(user.username, 12)}
          <div className="p-1 bg-highlight text-bg rounded-full flex justify-center items-center w-[20px] h-[20px] text-[14px]">
            {user.lvl}
          </div>
        </div>
      </div>
    </>
  );
};
