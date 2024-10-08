import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { config, FormDataI, initialState } from "./createClubFormConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import Select from "@atoms/Select";
import { getHoursInRange } from "@utils/timeUtils";
import SelectCountry from "@molecules/core/SelectCountry";
import { SelectCity } from "@molecules/core/SelectCity/SelectCity";
import { useCreateClubMutation } from "@redux/api/clubApi";
interface Option {
  value: string;
  label: string;
}
export const CreateClubForm: React.FC = observer(() => {
  const [selectedOpeningOption, setSelectedOpeningOption] = useState<Option>({
    label: "08:00",
    value: "08:00",
  });
  const [selectedClosingOption, setSelectedClosingOption] = useState<Option>({
    label: "23:00",
    value: "23:00",
  });
  const timeRange = getHoursInRange("00:00", "23:00");
  const options = timeRange.map((time) => ({ value: time, label: time }));

  const [formValue, setFormValue] = useState<FormDataI>(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();
  const [createClub] = useCreateClubMutation();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (city && country) {
      createClub({
        address: formValue.address,
        city: city,
        country: country,
        name: formValue.name,
        registration_address: "",
        opening: selectedOpeningOption.value,
        closing: selectedClosingOption.value,
      })
        .unwrap()
        .then((data) => {
          navigate(`/clubs/${data.id}`);
        });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="p-5 bg-primary rounded-xl">
        <div className="text-[24px]">Create club:</div>

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
          <SelectCountry setCountry={setCountry} country={undefined} />
        </div>

        <div className="mt-5">
          <SelectCity
            setCity={setCity}
            selectedCountry={country}
            city={undefined}
          />
        </div>

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
            placeholder="Club closing at"
          />
        </div>
        <div className="mt-5">
          {country == "" ||
            (!city && <div className="text-error">You mast select city</div>)}
          {country == "" && (
            <div className="text-error">You mast select country</div>
          )}
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Create
          </Button>
        </div>
      </div>
    </form>
  );
});
