import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import FriendCard from "@organisms/FriendCard";
import FriendStore from "../../../store/friends";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    FriendStore.getFriends("321");
  }, []);
  return (
    <div className="p-3">
      {FriendStore.friends.map((user) => (
        <FriendCard user={user} />
      ))}
    </div>
  );
});
