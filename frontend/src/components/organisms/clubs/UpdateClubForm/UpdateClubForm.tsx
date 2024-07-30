import React, { ChangeEvent, useState } from "react";

import { config, FormDataI, getInitState } from "./updateClubConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import ClubStore from "@store/club";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getHoursInRange } from "@utils/timeUtils";
import Select from "@atoms/Select";
interface Option {
  value: string;
  label: string;
}
export const UpdateClubForm: React.FC = observer(() => {
  const [selectedOpeningOption, setSelectedOpeningOption] = useState<Option>({
    label: "08:00",
    value: "08:00",
  });
  const [selectedClosingOption, setSelectedClosingOption] = useState<Option>({
    label: "23:00",
    value: "23:00",
  });
  const timeRange = getHoursInRange("08:00", "18:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));
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
        opening: selectedOpeningOption.value,
        closing: selectedClosingOption.value,
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
          <Label>Club opening at:</Label>

          <Select
            options={options}
            defaultValue={selectedOpeningOption}
            onChange={(option) => setSelectedOpeningOption(option)}
            placeholder="Club opening at"
          />
        </div>
        <div className="mt-5">
          <Label>Club closing at:</Label>

          <Select
            options={options}
            defaultValue={selectedClosingOption}
            onChange={(option) => setSelectedClosingOption(option)}
            placeholder="Club closing+ at"
          />
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
});
