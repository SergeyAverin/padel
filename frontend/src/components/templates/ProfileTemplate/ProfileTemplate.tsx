import React from "react";

import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import UserInfo from "@organisms/UserInfo";
import UserStats from "@organisms/UserStats";
import PadelInfo from "@organisms/PadelInfo";

export const ProfileTemplate: React.FC = () => {
  return (
    <div className="p-2">
      <UserInfo />
      <div className="mt-[30px]">
        <div className="w-[250px]">
          <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
        </div>
      </div>
      <div className="mt-[30px]">
        <Heading variant={HeadingVariant.H1}>Padel info:</Heading>
        <div className="mt-[8px]">
          <UserStats />
        </div>
      </div>
      <div className="mt-[30px]">
        <Heading variant={HeadingVariant.H1}>Stats:</Heading>
        <div className="mt-[8px]">
          <PadelInfo />
        </div>
      </div>
    </div>
  );
};
