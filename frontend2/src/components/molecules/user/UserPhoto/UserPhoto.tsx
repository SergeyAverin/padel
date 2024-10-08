import React from "react";

import UserLvl from "@molecules/user/UserLvl";
import classNames from "classnames";

interface IUserPhotoProps {
  avatar: string;
  lvl?: number | null;
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
          className={classNames("rounded-full object-cover", {
            "w-[92px] h-[92px]": isProfile,
            "w-[72px] h-[72px]": !isProfile,
          })}
        />
        <div className="absolute right-[-5px] bottom-[-5px]">
          {lvl && <UserLvl lvl={lvl} />}
        </div>
      </div>
    </>
  );
};
