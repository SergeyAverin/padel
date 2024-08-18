import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestInner from "@organisms/friends/FriendRequestInner";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";
import { useGetInnerFriendRequsetQuery } from "@redux/api/friendRequestApi";

export const InnerFriendRequestsTemplate: React.FC = observer(() => {
  const { data, isLoading } = useGetInnerFriendRequsetQuery();

  return (
    <div>
      {!isLoading && data ? (
        <>
          {data.length == 0 && (
            <EmptyBanner text="Here are the friend requests that have been sent to you." />
          )}
          {data.map((friendRequest) => (
            <FriendRequestInner
              friendRequestId={friendRequest.id}
              user={friendRequest.recipient_user}
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
