import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";
import FriendRequestsStore from "@store/friendRequests";
import FriendRequest from "@organisms/friends/FriendRequest";
import Tabs from "@molecules/Tabs";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    FriendStore.getFriends("3");
    FriendRequestsStore.getFriendRequests();
  }, []);
  const tabs = [
    {
      to: "#friends",
      text: "Friends",
      content: (
        <div>
          {FriendStore.friends.map((user) => (
            <FriendCard user={user} key={user.telegram_user_id} />
          ))}
        </div>
      ),
    },
    {
      to: "#friendRequests",
      text: "Friend requests",
      content: (
        <div>
          {FriendRequestsStore.friendRequests.map((friendRequest) => (
            <FriendRequest
              friendRequestId={friendRequest.id}
              key={friendRequest.id}
            />
          ))}
        </div>
      ),
    },
  ];
  return (
    <div className="p-3">
      <Tabs subTab={tabs} />
    </div>
  );
});
