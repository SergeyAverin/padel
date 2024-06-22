import React, { useState } from "react";

import TestPhoto from "@assets/TestPhoto.png";
import UserLvl from "@molecules/UserLvl";

export const UserInfo: React.FC = () => {
  const [isMore, setIsMore] = useState(true);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[100px] h-[100px]">
            <img src={TestPhoto} className="rounded-full" />
          </div>
          <div className="ml-[20px]">
            <div className="text-[24px] font-bold">UserName</div>
            <div className="text-[20px] font-medium">Sergey Averin</div>
            {!isMore && (
              <div
                className="text-highlight cursor-pointer text-[16px] mt-[8px]"
                onClick={() => setIsMore(true)}
              >
                Show more
              </div>
            )}
            {isMore && (
              <div
                className="text-highlight cursor-pointer text-[16px] mt-[8px]"
                onClick={() => setIsMore(false)}
              >
                Close
              </div>
            )}
          </div>
        </div>
        <UserLvl lvl={8.4} />
      </div>
      {isMore && (
        <div className="mt-[25px]">
          <Info infoValue="sergey.averin.003@gmail.com" infoKey="email" />
          <Info infoValue="sergey.averin.003@gmail.com" infoKey="email" />
          <Info infoValue="sergey.averin.003@gmail.com" infoKey="email" />
          <Info infoValue="sergey.averin.003@gmail.com" infoKey="email" />
        </div>
      )}
    </>
  );
};
interface IInfo {
  infoKey: string;
  infoValue: string;
}

export const Info: React.FC<IInfo> = ({ infoKey, infoValue }) => {
  return (
    <div className="text-[8px] mt-[8px] text-ellipsis overflow-hidden w-full">
      <span className="font-bold">{infoKey}:</span>
      <span className="ml-[5px]">{infoValue}</span>
    </div>
  );
};
