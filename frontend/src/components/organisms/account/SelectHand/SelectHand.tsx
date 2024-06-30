import React from "react";
import classNames from "classnames";

import LeftHandIcon from "@assets/LeftHandIcon.svg?react";
import HandRightIcon from "@assets/RightHandIcon.svg?react";

export const SelectHand: React.FC = () => {
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      <div className="text-[24px]">Select hand:</div>
      <div className="flex justify-around mt-5">
        <Hand icon={<LeftHandIcon />} text="Left hand" isActive={false} />
        <Hand icon={<HandRightIcon />} text="Right hand" isActive={true} />
      </div>
    </div>
  );
};

interface IHandProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const Hand: React.FC<IHandProps> = ({ icon, text, isActive }) => {
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
