import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestsStore from "@store/friendRequests";
import FriendRequestInner from "@organisms/friends/FriendRequestInner";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";

export const InnerFriendRequestsTemplate: React.FC = observer(() => {
  return (
    <div>
      {!FriendRequestsStore.isLoading ? (
        <>
          {FriendRequestsStore.friendRequestsInner.length == 0 && (
            <EmptyBanner text="No friend inner request" />
          )}
          {FriendRequestsStore.friendRequestsInner.map((friendRequest) => (
            <FriendRequestInner
              friendRequestId={friendRequest.id}
              key={friendRequest.id}
            />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});
