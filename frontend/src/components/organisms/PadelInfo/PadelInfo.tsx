import React from "react";

import HandIcon from "@assets/HandIcon.svg?react";
import BothIcon from "@assets/BothIcon.svg?react";

export const PadelInfo: React.FC = () => {
  return (
    <div className="bg-primary p-5 rounded-md flex justify-around items-start">
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          <HandIcon />
        </div>
        <div className="text-[16px] font-medium mt-[15px]">Right hand</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[36px] font-bold">
          <BothIcon />
        </div>
        <div className="text-[16px] font-medium mt-[15px]">Both position</div>
      </div>
    </div>
  );
};
