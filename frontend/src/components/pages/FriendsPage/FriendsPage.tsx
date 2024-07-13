import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Tabs from "@molecules/Tabs";
import InnerFriendRequestsTemplate from "@templates/InnerFriendRequestsTemplate";
import OuterFriendRequestsTemplate from "@templates/OuterFriendRequestsTemplate";
import FriendsTemplate from "@templates/FriendsTemplate";
import FriendStore from "@store/friends";
import FriendRequestsStore from "@store/friendRequests";
import AuthStore from "@store/auth";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser) {
      FriendStore.getFriends(AuthStore.authUser.telegram_user_id);
    }
    FriendRequestsStore.getInnerFriendRequests();
    FriendRequestsStore.getOuterFriendRequests();
  }, [AuthStore.authUser]);
  const tabs = [
    {
      to: "#friends",
      text: "Friends",
      content: <FriendsTemplate />,
    },
    {
      to: "#innerFriendRequests",
      text: "Inner",
      content: <InnerFriendRequestsTemplate />,
    },
    {
      to: "#outerFriendRequests",
      text: "Outer",
      content: <OuterFriendRequestsTemplate />,
    },
  ];
  return (
    <div className="p-3">
      <Tabs subTab={tabs} />
    </div>
  );
});
