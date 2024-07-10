import React from "react";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";
import FriendsFilter from "@organisms/friends/FriendsFilter";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";

export const FriendsTemplate: React.FC = () => {
  return (
    <div>
      {FriendStore.friends.length == 0 && (
        <EmptyBanner text="You have not friends" />
      )}

      <FriendsFilter />
      <div>
        {FriendStore.friends.map((user) => (
          <FriendCard user={user} key={user.telegram_user_id} />
        ))}
      </div>
    </div>
  );
};
