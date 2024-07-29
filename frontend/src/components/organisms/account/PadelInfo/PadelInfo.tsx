import React from "react";
import { observer } from "mobx-react-lite";

import { Hand, IUser, Position } from "@schemas/user";

import LeftHandIcon from "@assets/LeftHandIcon.svg?react";
import RightHandIcon from "@assets/RightHandIcon.svg?react";

import LeftIcon from "@assets/LeftIcon.svg?react";
import BothIcon from "@assets/BothIcon.svg?react";
import RightIcon from "@assets/RightIcon.svg?react";

interface IPadelInfoProps {
  user: IUser;
}

export const PadelInfo: React.FC<IPadelInfoProps> = observer(({ user }) => {
  return (
    <div className="bg-primary p-5 rounded-md flex justify-around items-start">
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          {user.hand == Hand.LEFT_HAND && <LeftHandIcon />}
          {user.hand == Hand.RIGHT_HAND && <RightHandIcon />}
        </div>
        <div className="text-[16px] font-medium mt-[15px]">
          {user.hand == Hand.LEFT_HAND && "Left hand"}
          {user.hand == Hand.RIGHT_HAND && "Right hand"}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          {user.position == Position.LEFT && <LeftIcon />}
          {user.position == Position.BOTH && <BothIcon />}
          {user.position == Position.RIGHT && <RightIcon />}
        </div>
        <div className="text-[16px] font-medium mt-[15px]">
          {user.position == Position.LEFT && "Left position"}
          {user.position == Position.BOTH && "Both position"}
          {user.position == Position.RIGHT && "Right position"}
        </div>
      </div>
    </div>
  );
});
