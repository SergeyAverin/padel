import React from "react";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";
import FriendsFilter from "@organisms/friends/FriendsFilter";

export const FriendsTemplate: React.FC = () => {
  return (
    <div>
      <FriendsFilter />
      <div>
        {FriendStore.friends.map((user) => (
          <FriendCard user={user} key={user.telegram_user_id} />
        ))}
      </div>
    </div>
  );
};
