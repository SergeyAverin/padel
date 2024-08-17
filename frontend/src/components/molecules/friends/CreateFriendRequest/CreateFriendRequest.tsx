import React from "react";
import { observer } from "mobx-react-lite";

import { Button, ButtonVariant } from "@atoms/index";
import { useCreateFriendRequestMutation } from "@redux/api/friendRequestApi";

interface CreateFriendRequestProps {
  userId: string;
}

export const CreateFriendRequest: React.FC<CreateFriendRequestProps> = observer(
  ({ userId }) => {
    const [createFriendRequest] = useCreateFriendRequestMutation();
    return (
      <Button
        variant={ButtonVariant.FULL_HIGHLIGHT}
        onClick={() => createFriendRequest(userId)}
      >
        Create friend request
      </Button>
    );
  }
);
