import React from "react";

import TestPhoto from "@assets/TestPhoto.png";
import UserLvl from "@molecules/UserLvl";

export const UserPhoto: React.FC = () => {
  return (
    <>
      <div className="relative">
        <img src={TestPhoto} className="rounded-full w-[72px] h-[72px]" />
        <div className="absolute right-[-5px] bottom-[-5px]">
          <UserLvl lvl={10} />
        </div>
      </div>
    </>
  );
};
