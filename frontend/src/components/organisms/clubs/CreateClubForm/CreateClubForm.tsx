import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { config, FormDataI, initialState } from "./createClubFormConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import ClubStore from "@store/club";

export const CreateClubForm: React.FC = observer(() => {
  const [formValue, setFormValue] = useState<FormDataI>(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newClubId = await ClubStore.createClub(formValue);
    navigate(`/clubs/${newClubId}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 bg-primary rounded-xl">
        <div className="text-[24px]">Main info:</div>

        {config.map((item) => (
          <div className="mt-[35px]" key={item.name}>
            {/* <Label>{item.name}</Label> */}
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
});
