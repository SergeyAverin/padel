import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useUnfriendMutation } from "@redux/api/friendsApi";

interface IUnFriendProps {
  friendId: string;
}

export const UnFriend: React.FC<IUnFriendProps> = ({ friendId }) => {
  const [unfriend] = useUnfriendMutation();

  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={() => unfriend(friendId)}>
      Unfriend
    </Button>
  );
};
