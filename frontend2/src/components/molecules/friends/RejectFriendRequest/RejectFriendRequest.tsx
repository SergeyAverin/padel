import { Button, ButtonVariant } from "@atoms/index";
import { useRejectFriendRequsetMutation } from "@redux/api/friendRequestApi";
import React from "react";

interface IRejectFriendRequestProps {
  userId: number;
}

export const RejectFriendRequest: React.FC<IRejectFriendRequestProps> = ({
  userId,
}) => {
  const [reject] = useRejectFriendRequsetMutation();
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={() => reject(userId)}>
      Reject
    </Button>
  );
};