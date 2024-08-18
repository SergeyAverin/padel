import React, { useState } from "react";

import { Position } from "@schemas/user";

import { PadelInfoItem } from "@molecules/user/PadelInfoItem/PadelInfoItem";
import { useAuthUser } from "@hooks/useAuthUser";
import { useChagePositionMutation } from "@redux/api/userApi";

import BothIcon from "@assets/BothIcon.svg?react";
import LeftIcon from "@assets/LeftIcon.svg?react";
import RightIcon from "@assets/RightIcon.svg?react";

export const SelectPosition: React.FC = () => {
  const user = useAuthUser();
  const [onChangePosition] = useChagePositionMutation();
  const [position, setPosition] = useState(user?.position);
  const onChange = (position: Position) => {
    if (user) {
      setPosition(position);
      onChangePosition({
        position: position,
        userId: user.telegram_user_id,
      });
    }
  };
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      {position && user && (
        <>
          <div className="text-[24px]">Select hand:</div>
          <div className="flex justify-around mt-5">
            <PadelInfoItem
              icon={<LeftIcon />}
              text="Left"
              isActive={position == Position.LEFT}
              onClick={() => onChange(Position.LEFT)}
            />
            <PadelInfoItem
              icon={<BothIcon />}
              text="Both"
              isActive={position == Position.BOTH}
              onClick={() => onChange(Position.BOTH)}
            />
            <PadelInfoItem
              icon={<RightIcon />}
              text="Right"
              isActive={position == Position.RIGHT}
              onClick={() => onChange(Position.RIGHT)}
            />
          </div>
        </>
      )}
    </div>
  );
};
