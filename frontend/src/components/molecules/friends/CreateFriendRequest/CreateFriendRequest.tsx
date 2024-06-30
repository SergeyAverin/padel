import React from "react";
import { observer } from "mobx-react-lite";

import { useCreateFriendRequest } from "./hooks/useCreateFriendRequest";
import { Button, ButtonVariant } from "@atoms/index";

interface CreateFriendRequestProps {
  userId: string;
}

export const CreateFriendRequest: React.FC<CreateFriendRequestProps> = observer(
  ({ userId }) => {
    const createFriendRequest = useCreateFriendRequest(userId);
    return (
      <Button
        variant={ButtonVariant.FULL_HIGHLIGHT}
        onClick={createFriendRequest}
      >
        Create friend request
      </Button>
    );
  }
);
