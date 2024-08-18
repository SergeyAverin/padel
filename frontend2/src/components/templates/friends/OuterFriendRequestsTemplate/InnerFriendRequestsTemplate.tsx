import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestOuter from "@organisms/friends/FriendRequestOuter";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";
import { useGetOuterFriendRequestQuery } from "@redux/api/friendRequestApi";

export const OuterFriendRequestsTemplate: React.FC = observer(() => {
  const { data, isLoading } = useGetOuterFriendRequestQuery();
  return (
    <div>
      {!isLoading && data ? (
        <>
          {data.length == 0 && (
            <EmptyBanner text="This is where the friend requests you sent in." />
          )}

          {data.map((friendRequest) => (
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
