import React, { ChangeEvent, useEffect, useState } from "react";
import { City, Country } from "country-state-city";

import { config, FormDataI, getInitState } from "./updateClubConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import ClubStore from "@store/club";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getHoursInRange } from "@utils/timeUtils";
import Select from "@atoms/Select";
import { generateRandomString } from "@utils/codeGenerate";
interface Option {
  value: string;
  label: string;
}
export const UpdateClubForm: React.FC = observer(() => {
  const [selectedCountry, setSelectedCountry] = useState<null | Option>(null);
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));
  const [selectedCity, setSelectedCity] = useState<null | Option>(null);
  const [cityOption, setCityOptions] = useState<Array<Option>>([]);

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
    if (ClubStore.openedClub && selectedCountry && selectedCity) {
      await ClubStore.updateClub(ClubStore.openedClub.id, {
        address: formValue.address,
        name: formValue.name,
        registration_address: "",
        opening: selectedOpeningOption.value,
        closing: selectedClosingOption.value,
        city: selectedCity.label,
        country: selectedCountry.label,
      });
      navigate(`/clubs/${ClubStore.openedClub.id}`);
    }
  };
  useEffect(() => {
    if (selectedCountry) {
      const options = City.getCitiesOfCountry(selectedCountry.value);
      if (options) {
        const mapedOptions = options.map((city) => {
          return {
            label: city.name,
            value: generateRandomString(10),
          };
        });
        setCityOptions(mapedOptions);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (ClubStore.openedClub) {
      const country = countryOptions.find((country) => {
        if (country.label == ClubStore.openedClub?.country) {
          return country;
        }
      });
      const findCity = cityOption.find((country) => {
        if (country.label == ClubStore.openedClub?.city) {
          return country;
        }
      });
      if (country && country.value != selectedCountry?.value) {
        setSelectedCountry(country);
      }
      if (findCity && findCity.label != selectedCity?.label) {
        setSelectedCity(findCity);
      }
    }
  }, [ClubStore.openedClub, cityOption]);
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
        <div className="mt-[18px] text-left">
          <Label>Select country</Label>
          <Select
            options={countryOptions}
            defaultValue={selectedCountry}
            onChange={(option) => setSelectedCountry(option)}
          />
        </div>
        {selectedCountry && (
          <div className="mt-[18px] text-left">
            <Label>Select city</Label>
            <Select
              options={cityOption}
              defaultValue={selectedCity}
              onChange={(option) => setSelectedCity(option)}
            />
          </div>
        )}
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
});
