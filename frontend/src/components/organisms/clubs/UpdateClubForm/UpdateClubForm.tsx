import React, { ChangeEvent, useState } from "react";

import { config, FormDataI, getInitState } from "./updateClubConfig";
import { Button, ButtonVariant, Input } from "@atoms/index";
import ClubStore from "@store/club";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const UpdateClubForm: React.FC = observer(() => {
  const [formValue, setFormValue] = useState<FormDataI>(getInitState());
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (ClubStore.openedClub) {
      await ClubStore.updateClub(ClubStore.openedClub.id, {
        address: formValue.address,
        city: formValue.city,
        name: formValue.name,
        registration_address: "",
      });
      navigate(`/clubs/${ClubStore.openedClub.id}`);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 bg-primary rounded-xl">
        <div className="text-[24px]">Main info:</div>

        {config.map((item) => (
          <div className="mt-[15px]" key={item.name}>
            {/* <Label>{item.name}</Label> */}
            <div className="mt-[30px]">
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
