import React, { useState } from "react";
import classNames from "classnames";

import LeftHandIcon from "@assets/LeftIcon.svg?react";
import HandRightIcon from "@assets/RightIcon.svg?react";
import BothIcon from "@assets/BothIcon.svg?react";
import UserStore from "@store/user";
import { Position } from "@schemas/user";

export const SelectPosition: React.FC = () => {
  const [position, sePosition] = useState(UserStore.user?.position);
  const onChangePosition = (position: Position) => {
    sePosition(position);
    UserStore.changePosition(position);
  };
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      <div className="text-[24px]">Select position:</div>
      <div className="flex justify-around mt-5">
        <Hand
          icon={<LeftHandIcon />}
          text="Left"
          isActive={position == Position.LEFT}
          onClick={() => onChangePosition(Position.LEFT)}
        />
        <Hand
          icon={<BothIcon />}
          text="Both"
          isActive={position == Position.BOTH}
          onClick={() => onChangePosition(Position.BOTH)}
        />
        <Hand
          icon={<HandRightIcon />}
          text="Right"
          isActive={position == Position.RIGHT}
          onClick={() => onChangePosition(Position.RIGHT)}
        />
      </div>
    </div>
  );
};

interface IPositionProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const Hand: React.FC<IPositionProps> = ({
  icon,
  text,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={classNames("flex flex-col items-center  p-5", {
        "border-highlight rounded-xl border-4": isActive,
      })}
      onClick={onClick}
    >
      {icon}
      <div className="mt-3">{text}</div>
    </div>
  );
};
