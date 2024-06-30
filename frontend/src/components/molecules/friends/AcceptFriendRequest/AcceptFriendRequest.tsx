import { Button, ButtonVariant } from "@atoms/index";
import React from "react";
import { useAcceptFriendRequest } from "./hooks/useAcceptFriendRequest";

interface IAcceptFriendRequest {
  userId: number;
}

export const AcceptFriendRequest: React.FC<IAcceptFriendRequest> = ({
  userId,
}) => {
  const onAccept = useAcceptFriendRequest(userId);
  return (
    <Button variant={ButtonVariant.FULL_HIGHLIGHT} onClick={onAccept}>
      Accept
    </Button>
  );
};
