import React from "react";

import UserLvl from "@molecules/account/UserLvl";
import classNames from "classnames";

interface IUserPhotoProps {
  avatar: string;
  lvl: number;
  isProfile?: boolean;
}

export const UserPhoto: React.FC<IUserPhotoProps> = ({
  avatar,
  lvl,
  isProfile = false,
}) => {
  return (
    <>
      <div className="relative">
        <img
          src={avatar}
          className={classNames("rounded-full ", {
            "w-[92px] h-[92px]": isProfile,
            "w-[72px] h-[72px]": !isProfile,
          })}
        />
        <div className="absolute right-[-5px] bottom-[-5px]">
          <UserLvl lvl={lvl} />
        </div>
      </div>
    </>
  );
};
