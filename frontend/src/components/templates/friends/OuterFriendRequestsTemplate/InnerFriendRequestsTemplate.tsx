import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestsStore from "@store/friends/friendRequests";
import FriendRequestOuter from "@organisms/friends/FriendRequestOuter";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";

export const OuterFriendRequestsTemplate: React.FC = observer(() => {
  return (
    <div>
      {!FriendRequestsStore.isLoading ? (
        <>
          {FriendRequestsStore.friendRequestsOuter.length == 0 && (
            <EmptyBanner text="This is where the friend requests you sent in." />
          )}

          {FriendRequestsStore.friendRequestsOuter.map((friendRequest) => (
            <FriendRequestOuter
              friendRequestId={friendRequest.id}
              key={friendRequest.id}
              user={friendRequest.recipient_user}
            />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});