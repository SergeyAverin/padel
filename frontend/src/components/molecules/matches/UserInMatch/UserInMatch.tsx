import React from "react";

import TestPhoto from "@assets/TestPhoto.png";

export const UserInMatch: React.FC = () => {
  return (
    <>
      <div className="flex flex-col justify-center p-2">
        <img src={TestPhoto} className="rounded-full w-[60px]" />
        <div className="text-[12px] text-center mt-2">Username</div>
        <div className="text-[12px] text-center mt-1">8</div>
      </div>
    </>
  );
};
