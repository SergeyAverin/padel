import React from "react";
import { observer } from "mobx-react-lite";

import { Hand, Position } from "@schemas/user";
import UserStore from "@store/user";

import LeftHandIcon from "@assets/LeftHandIcon.svg?react";
import RightHandIcon from "@assets/RightHandIcon.svg?react";

import LeftIcon from "@assets/LeftIcon.svg?react";
import BothIcon from "@assets/BothIcon.svg?react";
import RightIcon from "@assets/RightIcon.svg?react";

export const PadelInfo: React.FC = observer(() => {
  return (
    <div className="bg-primary p-5 rounded-md flex justify-around items-start">
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          {UserStore.user?.hand == Hand.LEFT_HAND && <LeftHandIcon />}
          {UserStore.user?.hand == Hand.RIGHT_HAND && <RightHandIcon />}
        </div>
        <div className="text-[16px] font-medium mt-[15px]">
          {UserStore.user?.hand == Hand.LEFT_HAND && "Left hand"}
          {UserStore.user?.hand == Hand.RIGHT_HAND && "Right hand"}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          {UserStore.user?.position == Position.LEFT && <LeftIcon />}
          {UserStore.user?.position == Position.BOTH && <BothIcon />}
          {UserStore.user?.position == Position.RIGHT && <RightIcon />}
        </div>
        <div className="text-[16px] font-medium mt-[15px]">
          {UserStore.user?.position == Position.LEFT && "Left position"}
          {UserStore.user?.position == Position.BOTH && "Both position"}
          {UserStore.user?.position == Position.RIGHT && "Right position"}
        </div>
      </div>
    </div>
  );
});
