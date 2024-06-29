import FriendCard from "@organisms/FriendCard";
import React from "react";

export const FriendsPage: React.FC = () => {
  return (
    <div className="p-3">
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
};
