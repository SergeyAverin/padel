import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestsStore from "@store/friendRequests";
import FriendRequestOuter from "@organisms/friends/FriendRequestOuter";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";

export const OuterFriendRequestsTemplate: React.FC = observer(() => {
  return (
    <div>
      {FriendRequestsStore.friendRequestsOuter.length == 0 && (
        <EmptyBanner text="No friend inner request" />
      )}

      {FriendRequestsStore.friendRequestsOuter.map((friendRequest) => (
        <FriendRequestOuter
          friendRequestId={friendRequest.id}
          key={friendRequest.id}
        />
      ))}
    </div>
  );
});
