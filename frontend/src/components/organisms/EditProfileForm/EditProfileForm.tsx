import { Input, Label } from "@atoms/index";
import React from "react";

export const EditProfileForm: React.FC = () => {
  return (
    <>
      <div className="p-5 bg-primary rounded-xl">
        <div className="text-[24px]">Main info:</div>
        <div className="mt-[15px]">
          <Label>Username:</Label>
          <div className="mt-[8px]">
            <Input name="username" value="sergey" />
          </div>
        </div>
        <div className="mt-[15px]">
          <Label>First name:</Label>
          <div className="mt-[8px]">
            <Input name="first_name" value="sergey" />
          </div>
        </div>
        <div className="mt-[15px]">
          <Label>Last name:</Label>
          <div className="mt-[8px]">
            <Input name="last_name" value="sergey" />
          </div>
        </div>
      </div>

      <div className="p-5 bg-primary rounded-xl mt-5">
        <div className="text-[24px]">Additional information:</div>
        <div className="mt-[15px]">
          <Label>Email:</Label>
          <div className="mt-[8px]">
            <Input name="email" value="sergey.averin.003@gmai.com" />
          </div>
        </div>
        <div className="mt-[15px]">
          <Label>Age:</Label>
          <div className="mt-[8px]">
            <Input name="age" value="21" />
          </div>
        </div>
      </div>
    </>
  );
};
