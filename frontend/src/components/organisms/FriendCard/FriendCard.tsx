import React from "react";

import TestPhoto from "@assets/TestPhoto.png";
import { Button, ButtonVariant } from "@atoms/index";
import Tag from "@molecules/Tag";
import UserPhoto from "@molecules/UserPhoto";
import { IUser } from "../../../types/user";

interface IFriendCardProps {
  user: IUser;
}

export const FriendCard: React.FC<IFriendCardProps> = ({ user }) => {
  return (
    <div className="bg-primary p-5 rounded-xl">
      <div className="flex justify-between">
        <div className="flex">
          <UserPhoto />

          <div className="ml-5">
            <div className="text-[16px] font-bold">{user.username}</div>
            <div className="text-[16px] font-medium">
              {user.first_name} {user.last_name}
            </div>
          </div>
        </div>
        <div className="w-[140px]">
          <Button variant={ButtonVariant.OUTLINED}>Unfrind</Button>
        </div>
      </div>
      <div className="mt-5 flex items-center flex-wrap">
        <div className="mr-3">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 first-line:mt-1">
          <Tag />
        </div>
      </div>
      <div className="mt-5 select-none cursor-pointer">+ TAG</div>
    </div>
  );
};
