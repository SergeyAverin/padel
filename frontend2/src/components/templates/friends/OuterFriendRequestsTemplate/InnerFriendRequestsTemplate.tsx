import React from "react";
import { observer } from "mobx-react-lite";

import FriendRequestOuter from "@organisms/friends/FriendRequestOuter";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";
import { useGetOuterFriendRequestQuery } from "@redux/api/friendRequestApi";
import { useAuthUser } from "@hooks/useAuthUser";

export const OuterFriendRequestsTemplate: React.FC = observer(() => {
  const { data, isLoading } = useGetOuterFriendRequestQuery();
  const authUser = useAuthUser();

  return (
    <div>
      {!isLoading && data ? (
        <>
          {data.length == 0 && (
            <EmptyBanner text="This is where the friend requests you sent in." />
          )}

          {data.map((friendRequest) => (
            <div>
              {authUser &&
                friendRequest.recipient_user.username != authUser.username && (
                  <div className="mb-2" key={friendRequest.id}>
                    <FriendRequestOuter
                      friendRequestId={friendRequest.id}
                      user={friendRequest.recipient_user}
                    />
                  </div>
                )}
            </div>
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});
