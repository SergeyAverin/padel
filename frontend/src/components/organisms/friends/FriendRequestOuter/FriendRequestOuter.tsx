import React from "react";

import UserPhoto from "@molecules/account/UserPhoto";
import CancelFriendRequest from "@molecules/friends/CancelFriendRequest";
import { IUser } from "@schemas/user";

interface IFriendRequestProps {
  friendRequestId: number;
  user: IUser;
}

export const FriendRequestOuter: React.FC<IFriendRequestProps> = ({
  friendRequestId,
  user,
}) => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <div className="flex">
        <UserPhoto lvl={user.lvl} avatar={user.avatar} />
        <div className="ml-5">
          <div className="text-[16px] font-bold">{user.username}</div>
          <div className="text-[16px] font-medium">
            {user.first_name}{" "}
            {user.last_name.toLowerCase() != "none" && user.last_name}
          </div>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-[140px]">
          <CancelFriendRequest requestId={friendRequestId} userId={""} />
        </div>
      </div>
    </div>
  );
};
