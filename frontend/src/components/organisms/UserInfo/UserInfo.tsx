import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { useLoadUserInfo } from "./hooks/useLoadUserInfo";
import UserLvl from "@molecules/account/UserLvl";
import UserPhoto from "@molecules/account/UserPhoto";
import UserStore from "@store/user";

export const UserInfo: React.FC = observer(() => {
  const [isMore, setIsMore] = useState(false);
  useLoadUserInfo();

  return (
    <>
      {UserStore.user && (
        <div>
          <div className="flex justify-between">
            <div className="flex">
              <div className="w-[100px] h-[100px]">
                <UserPhoto />
              </div>
              <div className="ml-[20px]">
                <div className="text-[24px] font-bold">
                  {UserStore.user.username}
                </div>
                <div className="text-[20px] font-medium">
                  {UserStore.user.first_name} {UserStore.user.last_name}
                </div>
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
              <Info infoValue={UserStore.user.email} infoKey="email" />
              <Info infoValue={UserStore.user.age} infoKey="age" />
            </div>
          )}
        </div>
      )}
    </>
  );
});
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
