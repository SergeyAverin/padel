import Tabs from "@molecules/core/Tabs";
import FriendsTemplate from "@templates/friends/FriendsTemplate";
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
      content: (
        <>
          <div>123</div>
        </>
      ),
    },
    {
      to: "#outerFriendRequests",
      text: "Outer",
      content: (
        <>
          <div>123</div>
        </>
      ),
    },
    {
      to: "#findUser",
      text: "Find",
      content: <div>123</div>,
    },
  ];
  return (
    <>
      <Tabs subTab={tabs} />
    </>
  );
};
