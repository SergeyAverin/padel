import React from "react";

import UserPhoto from "@molecules/account/UserPhoto";
import CancelFriendRequest from "@molecules/friends/CancelFriendRequest";

interface IFriendRequestProps {
  friendRequestId: number;
}

export const FriendRequestOuter: React.FC<IFriendRequestProps> = ({
  friendRequestId,
}) => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <div className="flex">
        <UserPhoto avatar="http://averin.pagekite.me/api/v1.0/user/image/default.png" />
        <div className="ml-5">
          <div className="text-[16px] font-bold">Username</div>
          <div className="text-[16px] font-medium">Sergey averin</div>
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
