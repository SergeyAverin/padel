import React from "react";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";

export const FriendsTemplate: React.FC = () => {
  return (
    <div>
      {FriendStore.friends.map((user) => (
        <FriendCard user={user} key={user.telegram_user_id} />
      ))}
    </div>
  );
};
