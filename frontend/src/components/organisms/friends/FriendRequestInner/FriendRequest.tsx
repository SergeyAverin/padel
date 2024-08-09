import React from "react";

import UserPhoto from "@molecules/account/UserPhoto";
import AcceptFriendRequest from "@molecules/friends/AcceptFriendRequest";
import RejectFriendRequest from "@molecules/friends/RejectFriendRequest";
import { IUser } from "@schemas/user";
import { Link } from "react-router-dom";

interface IFriendRequestProps {
  friendRequestId: number;
  user: IUser;
}

export const FriendRequestInner: React.FC<IFriendRequestProps> = ({
  friendRequestId,
  user,
}) => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <Link to={`/user/${user.telegram_user_id}`}>
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
      </Link>

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
