import { useAnimation } from "@hooks/useAnimation";
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
  const container = useAnimation("/EmptyAnimation.json");
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div>
        {icon ? (
          icon
        ) : (
          <div className="mx-auto w-[250px] mt-[38px]">
            <div ref={container}></div>
          </div>
        )}
      </div>
      <div>{text}</div>
    </div>
  );
};
