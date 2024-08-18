import Tabs from "@molecules/core/Tabs";
import FindUserForm from "@organisms/friends/FindUserForm";
import FriendsTemplate from "@templates/friends/FriendsTemplate";
import InnerFriendRequestsTemplate from "@templates/friends/InnerFriendRequestsTemplate";
import OuterFriendRequestsTemplate from "@templates/friends/OuterFriendRequestsTemplate";
import React from "react";

export const FriendPage: React.FC = () => {
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
    {
      to: "#findUser",
      text: "Find",
      content: <FindUserForm />,
    },
  ];
  return (
    <>
      <Tabs subTab={tabs} />
    </>
  );
};
