import React from "react";

import { Button, ButtonVariant } from "@atoms/index";

import UserPhoto from "@molecules/UserPhoto";

export const FriendRequest: React.FC = () => {
  return (
    <div className="bg-primary p-5 rounded-2xl">
      <div className="flex">
        <UserPhoto />
        <div className="ml-5">
          <div className="text-[16px] font-bold">Username</div>
          <div className="text-[16px] font-medium">Sergey averin</div>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-[140px]">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT}>Accept</Button>
        </div>
        <div className="w-[140px] ml-3">
          <Button variant={ButtonVariant.OUTLINED}>Reject</Button>
        </div>
      </div>
    </div>
  );
};
