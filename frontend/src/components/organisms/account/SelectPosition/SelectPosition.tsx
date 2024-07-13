import React from "react";
import classNames from "classnames";

import { useSetPosition } from "./hook/useSetPosition";
import BothIcon from "@assets/BothIcon.svg?react";
import { Position } from "@schemas/user";

import LeftHandIcon from "@assets/LeftIcon.svg?react";
import HandRightIcon from "@assets/RightIcon.svg?react";

export const SelectPosition: React.FC = () => {
  const [position, onChangePosition] = useSetPosition();
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
        "border-highlight rounded-xl border-4 ": isActive,
        "border-primary border-4 ": !isActive,
      })}
      onClick={onClick}
    >
      {icon}
      <div className="mt-3">{text}</div>
    </div>
  );
};
