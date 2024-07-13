import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import UserPhoto from "@molecules/account/UserPhoto";
import { IUser } from "@schemas/user";

interface IUserInfoProps {
  user: IUser;
}

export const UserInfo: React.FC<IUserInfoProps> = observer(({ user }) => {
  const [isMore, setIsMore] = useState(false);
  // useLoadUserInfo();

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-[100px] h-[100px]">
              <UserPhoto avatar={user.avatar} />
            </div>
            <div className="ml-[20px]">
              <div className="text-[24px] font-bold">{user.username}</div>
              <div className="text-[20px] font-medium">
                {user.first_name} {user.last_name}
              </div>
              {!isMore && (
                <div
                  className="text-highlight cursor-pointer text-[16px] mt-[8px]"
                  onClick={() => {
                    setIsMore(true);
                    navigator.vibrate(40);
                  }}
                >
                  Show more
                </div>
              )}
              {isMore && (
                <div
                  className="text-highlight cursor-pointer text-[16px] mt-[8px]"
                  onClick={() => {
                    setIsMore(false);
                    navigator.vibrate(40);
                  }}
                >
                  Close
                </div>
              )}
            </div>
          </div>
        </div>
        {isMore && (
          <div className="mt-[25px]">
            <Info infoValue={user.email} infoKey="email" />
            <Info infoValue={user.age} infoKey="age" />
          </div>
        )}
      </div>
    </>
  );
});
interface IInfo {
  infoKey: string;
  infoValue: string | number;
}

export const Info: React.FC<IInfo> = ({ infoKey, infoValue }) => {
  return (
    <div className="text-[8px] mt-[8px] text-ellipsis overflow-hidden w-full">
      <span className="font-bold">{infoKey}:</span>
      <span className="ml-[5px]">{infoValue}</span>
    </div>
  );
};
