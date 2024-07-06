import React from "react";

import Tag from "@molecules/friends/Tag";
import UserPhoto from "@molecules/account/UserPhoto";
import { IUser } from "@schemas/user";
import UnFriend from "@molecules/friends/UnFriend";

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
          <UnFriend friendId={user.telegram_user_id} />
        </div>
      </div>
      <div className="mt-5 flex items-center flex-wrap">
        <div className="mr-1">
          <Tag />
        </div>
        <div className="mr-1 mt-1">
          <Tag />
        </div>
        <div className="mr-1 mt-1">
          <Tag />
        </div>
        <div className="mr-1 mt-1">
          <Tag />
        </div>
        <div className="mr-1 mt-1">
          <Tag />
        </div>
        <div className="mr-1 first-line:mt-1">
          <Tag />
        </div>
      </div>
      <div className="mt-5 select-none cursor-pointer">+ TAG</div>
    </div>
  );
};
