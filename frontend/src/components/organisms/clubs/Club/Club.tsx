import { Button, ButtonVariant } from "@atoms/index";
import React from "react";

import BookmarkOffIcon from "@assets/BookmarkOffIcon.svg?react";
import AddressIcon from "@assets/AddressIcon.svg?react";

export const Club: React.FC = () => {
  return (
    <div className="rounded-2xl p-4 bg-primary">
      <h2 className="text-[16px] font-bold">Name</h2>
      <div className="flex mt-5  justify-between">
        <div className="flex w-full  items-center">
          <AddressIcon />
          <div className="text-[12px] font-medium ml-3">address</div>
        </div>
        <div>
          <BookmarkOffIcon />
        </div>
      </div>
      <div className="mt-5">
        <Button variant={ButtonVariant.OUTLINED}>Show more</Button>
      </div>
    </div>
  );
};
