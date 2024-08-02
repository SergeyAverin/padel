import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { Info } from "./Info";
import UserPhoto from "@molecules/account/UserPhoto";
import { IUser } from "@schemas/user";
import { shortenString } from "@utils/shoringString";

interface IUserInfoProps {
  user: IUser;
}

export const UserInfo: React.FC<IUserInfoProps> = observer(({ user }) => {
  const [isMore, setIsMore] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-[100px] h-[100px]">
              <UserPhoto avatar={user.avatar} isProfile={true} lvl={user.lvl} />
            </div>
            <div className="ml-[20px]">
              <div className="text-[24px] font-bold">
                {shortenString(user.username, 18)}
              </div>
              <div className="text-[20px] font-medium">
                {shortenString(user.first_name, 20)}
                <br></br>
                {shortenString(user.last_name, 20)}
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
            <Info infoValue={user.city} infoKey="city" />
            <Info infoValue={user.country} infoKey="country" />
          </div>
        )}
      </div>
    </>
  );
});
