import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useCancelFriendRequest } from "./hooks/useCancelFriendRequest.ts";

interface ICancelFriendRequestProps {
  requestId: number;
  userId: string;
}

export const CancelFriendRequest: React.FC<ICancelFriendRequestProps> = ({
  requestId,
  userId,
}) => {
  const onAccept = useCancelFriendRequest(requestId, userId);
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={onAccept}>
      Cancel
    </Button>
  );
};
