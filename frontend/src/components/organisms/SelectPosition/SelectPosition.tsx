import React from "react";
import classNames from "classnames";

import LeftHandIcon from "@assets/LeftIcon.svg?react";
import HandRightIcon from "@assets/RightIcon.svg?react";
import BothIcon from "@assets/BothIcon.svg?react";

export const SelectPosition: React.FC = () => {
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      <div className="text-[24px]">Select position:</div>
      <div className="flex justify-around mt-5">
        <Hand icon={<LeftHandIcon />} text="Left" isActive={false} />
        <Hand icon={<BothIcon />} text="Both" isActive={true} />
        <Hand icon={<HandRightIcon />} text="Right" isActive={false} />
      </div>
    </div>
  );
};

interface IPositionProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const Hand: React.FC<IPositionProps> = ({ icon, text, isActive }) => {
  return (
    <div
      className={classNames("flex flex-col items-center  p-5", {
        "border-highlight rounded-xl border-4": isActive,
      })}
    >
      {icon}
      <div className="mt-3">{text}</div>
    </div>
  );
};
