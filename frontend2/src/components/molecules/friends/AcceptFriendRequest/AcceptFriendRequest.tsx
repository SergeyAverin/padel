import React from "react";

import { Button, ButtonVariant } from "@atoms/index";
import { useAcceptFriendRequsetMutation } from "@redux/api/friendRequestApi";

interface IAcceptFriendRequestProps {
  requestId: number;
}

export const AcceptFriendRequest: React.FC<IAcceptFriendRequestProps> = ({
  requestId,
}) => {
  const [accept, { isLoading }] = useAcceptFriendRequsetMutation();
  return (
    <Button
      variant={ButtonVariant.FULL_HIGHLIGHT}
      onClick={() => accept(requestId)}
      isLoading={isLoading}
    >
      Accept
    </Button>
  );
};
