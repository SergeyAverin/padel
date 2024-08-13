import React from "react";

import EmptyIcon from "@assets/EmptyIcon.svg?react";

interface IEmptyBannerProps {
  text?: string;
  icon?: React.ReactNode;
}

export const EmptyBanner: React.FC<IEmptyBannerProps> = ({
  text = "Empty",
  icon = <EmptyIcon />,
}) => {
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div>{icon}</div>
      <div className="w-[65%] text-center">{text}</div>
    </div>
  );
};
