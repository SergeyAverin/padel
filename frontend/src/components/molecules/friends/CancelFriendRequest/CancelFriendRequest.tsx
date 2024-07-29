import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useCancelFriendRequest } from "./hooks/useCancelFriendRequest.ts";

interface ICancelFriendRequestProps {
  requestId: number;
  userId: string;
}

export const CancelFriendRequest: React.FC<ICancelFriendRequestProps> = ({
  requestId,
}) => {
  const onAccept = useCancelFriendRequest(requestId);
  return (
    <Button variant={ButtonVariant.OUTLINED} onClick={onAccept}>
      Cancel
    </Button>
  );
};
