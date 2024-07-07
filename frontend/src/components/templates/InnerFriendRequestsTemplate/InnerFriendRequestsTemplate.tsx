import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestsStore from "@store/friendRequests";
import FriendRequestInner from "@organisms/friends/FriendRequestInner";

export const InnerFriendRequestsTemplate: React.FC = observer(() => {
  return (
    <div>
      {FriendRequestsStore.friendRequestsInner.map((friendRequest) => (
        <FriendRequestInner
          friendRequestId={friendRequest.id}
          key={friendRequest.id}
        />
      ))}
    </div>
  );
});
