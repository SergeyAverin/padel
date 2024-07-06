import React, { ChangeEvent, useState } from "react";

import { config, FormDataI, getInitState } from "./editProfileConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import UserStore from "@store/user";
import { useNavigate } from "react-router-dom";

export const EditProfileForm: React.FC = () => {
  const [formValue, setFormValue] = useState<FormDataI>(getInitState());
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formValue);
    UserStore.updateUser("3", formValue);
    navigate("/profile");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 bg-primary rounded-xl">
        <div className="text-[24px]">Main info:</div>

        {config.map((item) => (
          <div className="mt-[15px]" key={item.name}>
            <Label>{item.name}</Label>
            <div className="mt-[8px]">
              <Input
                name={item.name}
                value={formValue[item.name as keyof FormDataI]}
                onChange={onChange}
              />
            </div>
          </div>
        ))}
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
};
