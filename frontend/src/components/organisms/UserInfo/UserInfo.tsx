import React from "react";

import TestPhoto from "@assets/TestPhoto.png";
import UserLvl from "@molecules/UserLvl";

export const UserInfo: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="w-[100px] h-[100px]">
          <img src={TestPhoto} className="rounded-full" />
        </div>
        <div className="ml-[20px]">
          <div className="text-[24px] font-bold">UserName</div>
          <div className="text-[20px] font-medium">Sergey Averin</div>
        </div>
      </div>
      <UserLvl lvl={8.4} />
    </div>
  );
};
