import { Button, ButtonVariant } from "@atoms/index";
import React from "react";
import { useRejectFriendRequest } from "./hooks/useRejectFriendRequest";

interface IRejectFriendRequestProps {
  userId: number;
}

export const RejectFriendRequest: React.FC<IRejectFriendRequestProps> = ({
  userId,
}) => {
  const onAccept = useRejectFriendRequest(userId);
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={onAccept}>
      Reject
    </Button>
  );
};
