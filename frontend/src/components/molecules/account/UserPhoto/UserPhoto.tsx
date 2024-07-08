import React from "react";

import UserLvl from "@molecules/account/UserLvl";

interface IUserPhotoProps {
  avatar: string;
}

export const UserPhoto: React.FC<IUserPhotoProps> = ({ avatar }) => {
  return (
    <>
      <div className="relative">
        <img src={avatar} className="rounded-full w-[72px] h-[72px]" />
        <div className="absolute right-[-5px] bottom-[-5px]">
          <UserLvl lvl={10} />
        </div>
      </div>
    </>
  );
};
