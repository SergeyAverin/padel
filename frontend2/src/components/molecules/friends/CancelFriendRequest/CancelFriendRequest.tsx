import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useCancelFriendRequsetMutation } from "@redux/api/friendRequestApi";

interface ICancelFriendRequestProps {
  requestId: number;
}

export const CancelFriendRequest: React.FC<ICancelFriendRequestProps> = ({
  requestId,
}) => {
  const [cancel, { isLoading }] = useCancelFriendRequsetMutation();
  return (
    <Button
      variant={ButtonVariant.OUTLINED}
      onClick={() => cancel(requestId)}
      isLoading={isLoading}
    >
      Cancel
    </Button>
  );
};
