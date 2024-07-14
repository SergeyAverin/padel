import React from "react";
import { observer } from "mobx-react-lite";

import Tabs from "@molecules/Tabs";
import InnerFriendRequestsTemplate from "@templates/InnerFriendRequestsTemplate";
import OuterFriendRequestsTemplate from "@templates/OuterFriendRequestsTemplate";
import FriendsTemplate from "@templates/FriendsTemplate";
import FindUserForm from "@organisms/friends/FindUserForm";

export const FriendsPage: React.FC = observer(() => {
  const tabs = [
    {
      to: "#friends",
      text: "Friends",
      content: <FriendsTemplate />,
    },
    {
      to: "#innerFriendRequests",
      text: "Inner",
      content: (
        <>
          <InnerFriendRequestsTemplate />
        </>
      ),
    },
    {
      to: "#outerFriendRequests",
      text: "Outer",
      content: (
        <>
          <OuterFriendRequestsTemplate />
        </>
      ),
    },
    {
      to: "#findUser",
      text: "Find",
      content: <FindUserForm />,
    },
  ];
  return (
    <div className="p-3">
      <Tabs subTab={tabs} />
    </div>
  );
});
