import React, { useState } from "react";
import classNames from "classnames";

import { Hand as HandEnum } from "@schemas/user";
import UserStore from "@store/user";

import LeftHandIcon from "@assets/LeftHandIcon.svg?react";
import HandRightIcon from "@assets/RightHandIcon.svg?react";

export const SelectHand: React.FC = () => {
  const [hand, setHand] = useState(UserStore.user?.hand);
  const onChangeHand = (hand: HandEnum) => {
    setHand(hand);
    UserStore.changeHand(hand);
  };
  return (
    <div className="p-5 bg-primary rounded-xl mt-5">
      <div className="text-[24px]">Select hand:</div>
      <div className="flex justify-around mt-5">
        <Hand
          icon={<LeftHandIcon />}
          text="Left hand"
          isActive={hand == HandEnum.LEFT_HAND}
          onClick={() => onChangeHand(HandEnum.LEFT_HAND)}
        />
        <Hand
          icon={<HandRightIcon />}
          text="Right hand"
          isActive={hand == HandEnum.RIGHT_HAND}
          onClick={() => onChangeHand(HandEnum.RIGHT_HAND)}
        />
      </div>
    </div>
  );
};

interface IHandProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const Hand: React.FC<IHandProps> = ({
  icon,
  text,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={classNames("flex flex-col items-center  p-5 box-border", {
        "border-highlight rounded-xl border-4 box-border": isActive,
      })}
      onClick={onClick}
    >
      {icon}
      <div className="mt-3">{text}</div>
    </div>
  );
};
