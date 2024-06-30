import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useCancelFriendRequest } from "./hooks/useCancelFriendRequest.ts";

interface ICancelFriendRequestProps {
  userId: number;
}

export const CancelFriendRequest: React.FC<ICancelFriendRequestProps> = ({
  userId,
}) => {
  const onAccept = useCancelFriendRequest(userId);
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={onAccept}>
      Cancel
    </Button>
  );
};
