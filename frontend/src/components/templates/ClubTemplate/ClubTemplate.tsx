import React from "react";

import { Heading, HeadingVariant } from "@atoms/index";

import AddressIcon from "@assets/AddressIcon.svg?react";

export const ClubTemplate: React.FC = () => {
  return (
    <div className="p-5">
      <Heading variant={HeadingVariant.H1}>Club</Heading>
      <div className="flex w-full  items-center">
        <AddressIcon />
        <div className="text-[12px] font-medium ml-3">asd</div>
      </div>
    </div>
  );
};
