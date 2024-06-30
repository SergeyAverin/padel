import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import FriendCard from "@organisms/FriendCard";
import FriendStore from "@store/friends";
import FriendRequestsStore from "@store/friendRequests";
import FriendRequest from "@organisms/FriendRequest";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    FriendStore.getFriends("321");
    FriendRequestsStore.getFriendRequests();
  }, []);
  return (
    <div className="p-3">
      {FriendStore.friends.map((user) => (
        <FriendCard user={user} />
      ))}
      {FriendRequestsStore.friendRequests.map((friendRequest) => (
        <FriendRequest friendRequestId={friendRequest.id} />
      ))}
    </div>
  );
});
