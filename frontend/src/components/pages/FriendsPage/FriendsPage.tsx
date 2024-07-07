import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Tabs from "@molecules/Tabs";
import InnerFriendRequestsTemplate from "@templates/InnerFriendRequestsTemplate";
import OuterFriendRequestsTemplate from "@templates/OuterFriendRequestsTemplate";
import FriendsTemplate from "@templates/FriendsTemplate";
import FriendStore from "@store/friends";
import FriendRequestsStore from "@store/friendRequests";

export const FriendsPage: React.FC = observer(() => {
  useEffect(() => {
    FriendStore.getFriends("3");
    FriendRequestsStore.getInnerFriendRequests();
    FriendRequestsStore.getOuterFriendRequests();
  }, []);
  const tabs = [
    {
      to: "#friends",
      text: "Friends",
      content: <FriendsTemplate />,
    },
    {
      to: "#innerFriendRequests",
      text: "Inner requests",
      content: <InnerFriendRequestsTemplate />,
    },
    {
      to: "#outerFriendRequests",
      text: "Outer requests",
      content: <OuterFriendRequestsTemplate />,
    },
  ];
  return (
    <div className="p-3">
      <Tabs subTab={tabs} />
    </div>
  );
});
