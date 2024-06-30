import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useUnFriend } from "./hooks/useUnFriend.ts";

interface IUnFriendProps {
  friendId: string;
}

export const UnFriend: React.FC<IUnFriendProps> = ({ friendId }) => {
  const onUnFriend = useUnFriend(friendId);

  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={onUnFriend}>
      Cancel
    </Button>
  );
};
