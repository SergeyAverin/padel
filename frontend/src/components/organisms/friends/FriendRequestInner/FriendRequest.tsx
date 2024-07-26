import React from "react";

import UserPhoto from "@molecules/account/UserPhoto";
import AcceptFriendRequest from "@molecules/friends/AcceptFriendRequest";
import RejectFriendRequest from "@molecules/friends/RejectFriendRequest";

interface IFriendRequestProps {
  friendRequestId: number;
}

export const FriendRequestInner: React.FC<IFriendRequestProps> = ({
  friendRequestId,
}) => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <div className="flex">
        <UserPhoto
          lvl={user.lvl}
          avatar="http://averin.pagekite.me/api/v1.0/user/image/default.png"
        />
        <div className="ml-5">
          <div className="text-[16px] font-bold">Player 2</div>
          <div className="text-[16px] font-medium">Jacob Williams</div>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-[140px]">
          <AcceptFriendRequest userId={friendRequestId} />
        </div>
        <div className="w-[140px] ml-3">
          <RejectFriendRequest userId={friendRequestId} />
        </div>
      </div>
    </div>
  );
};
