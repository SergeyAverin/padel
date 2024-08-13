import React, { useState } from "react";

import { Info } from "./Info";
import UserPhoto from "@molecules/user/UserPhoto";
import { IUser } from "@schemas/user";
import { shortenString } from "@utils/shoringString";
import { Country } from "country-state-city";

interface IUserInfoProps {
  user: IUser;
}

export const UserInfo: React.FC<IUserInfoProps> = ({ user }) => {
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
                {user.last_name.toLowerCase() != "none" &&
                  shortenString(user.last_name, 20)}
              </div>
              {!isMore && (
                <div
                  className="text-highlight cursor-pointer text-[16px] mt-[8px]"
                  onClick={() => {
                    setIsMore(true);
                    navigator.vibrate(30);
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
                    navigator.vibrate(30);
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
            <Info
              infoValue={Country.getCountryByCode(user.country)?.name}
              infoKey="country"
            />
            <Info infoValue={user.city} infoKey="city" />
          </div>
        )}
      </div>
    </>
  );
};
