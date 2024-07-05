import UserInMatch from "@molecules/matches/UserInMatch";
import React from "react";

export const Match: React.FC = () => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <div className="flex justify-between">
        <div className="font-light text-[14px]">Friday 30 May | 10:00h</div>
        <div className="font-light text-[14px]">Status</div>
      </div>
      <div className="mt-2">
        <div className="font-light text-[14px]">Club name address</div>
      </div>
      <div className="flex mt-5 justify-around items-center">
        <div>
          <UserInMatch />
        </div>
        <div>
          <UserInMatch />
        </div>
        <div className="w-[1px] h-[120px] bg-fg"></div>
        <div>
          <UserInMatch />
        </div>
        <div>
          <UserInMatch />
        </div>
      </div>
    </div>
  );
};
