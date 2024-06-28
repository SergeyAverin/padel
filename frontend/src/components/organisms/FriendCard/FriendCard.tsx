import React from "react";

import TestPhoto from "@assets/TestPhoto.png";
import { Button, ButtonVariant } from "@atoms/index";
import Tag from "@molecules/Tag";
import UserPhoto from "@molecules/UserPhoto";

export const FriendCard: React.FC = () => {
  return (
    <div className="bg-primary p-5 rounded-xl">
      <div className="flex justify-between">
        <div className="flex">
          <UserPhoto />

          <div className="ml-5">
            <div className="text-[16px] font-bold">Username</div>
            <div className="text-[16px] font-medium">Sergey averin</div>
          </div>
        </div>
        <div className="w-[140px]">
          <Button variant={ButtonVariant.OUTLINED}>Unfrind</Button>
        </div>
      </div>
      <div className="mt-5 flex items-center flex-wrap">
        <div className="mr-3">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 mt-1">
          <Tag />
        </div>
        <div className="mr-3 first-line:mt-1">
          <Tag />
        </div>
      </div>
      <div className="mt-5 select-none cursor-pointer">+ TAG</div>
    </div>
  );
};
