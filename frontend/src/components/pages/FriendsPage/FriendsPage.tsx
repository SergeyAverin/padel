import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";
import FriendRequestsStore from "@store/friendRequests";
import FriendRequest from "@organisms/friends/FriendRequest";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    FriendStore.getFriends("321");
    FriendRequestsStore.getFriendRequests();
  }, []);
  return (
    <div className="p-3">
      {FriendStore.friends.map((user) => (
        <FriendCard user={user} key={user.telegram_user_id} />
      ))}
      {FriendRequestsStore.friendRequests.map((friendRequest) => (
        <FriendRequest
          friendRequestId={friendRequest.id}
          key={friendRequest.id}
        />
      ))}
    </div>
  );
});