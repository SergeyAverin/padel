import React from "react";
import { observer } from "mobx-react-lite";

import { Spinner } from "@atoms/index";
import FriendCard from "@organisms/friends/FriendCard";
import FriendsFilter from "@organisms/friends/FriendsFilter";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import FriendStore from "@store/friends";

export const FriendsTemplate: React.FC = observer(() => {
  return (
    <div>
      {!FriendStore.isLoading ? (
        <>
          {/* Filter */}
          <FriendsFilter />

          {/* Empty banner */}
          {FriendStore.friends.length == 0 && (
            <EmptyBanner text="You have not friends" />
          )}

          {/* Friends */}
          <div>
            {FriendStore.friends.map((user) => (
              <FriendCard user={user} key={user.telegram_user_id} />
            ))}
          </div>
        </>
      ) : (
        // Loading
        <Spinner />
      )}
    </div>
  );
});
