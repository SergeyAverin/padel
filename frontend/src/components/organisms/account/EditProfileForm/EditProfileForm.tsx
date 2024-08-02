import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { City, Country } from "country-state-city";

import { config, FormDataI, getInitState } from "./editProfileConfig";
import { Button, ButtonVariant, Input, Label } from "@atoms/index";
import UserStore from "@store/user";
import AuthStore from "@store/auth";
import Select from "@atoms/Select";
import { Option } from "@atoms/Select/selectOption";
import { generateRandomString } from "@utils/codeGenerate";

export const EditProfileForm: React.FC = () => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [formValue, setFormValue] = useState<FormDataI>(getInitState());
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value.trim() }));
  };
  const [selectedCountry, setSelectedCountry] = useState<null | Option>(null);
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));
  const [selectedCity, setSelectedCity] = useState<null | Option>(null);
  const [cityOption, setCityOptions] = useState<Array<Option>>([]);
  const navigate = useNavigate();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      re.test(String(formValue.email)) &&
      formValue.age > 0 &&
      selectedCity &&
      selectedCountry
    ) {
      if (AuthStore.authUser) {
        UserStore.updateUser(AuthStore.authUser.telegram_user_id, {
          ...formValue,
          city: selectedCity.label,
          country: selectedCountry.label,
        });
      }
      navigate("/profile");
    } else {
      alert("Write a valid data!!!");
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
    if (AuthStore.authUser) {
      const country = countryOptions.find((country) => {
        if (country.label == AuthStore.authUser?.country) {
          return country;
        }
      });
      const findCity = cityOption.find((country) => {
        if (country.label == AuthStore.authUser?.city) {
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
  }, [AuthStore.authUser, cityOption]);

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
          {formValue.age <= 0 && <div className="text-error">Invalid age</div>}
          {selectedCity?.value == "" ||
            (!selectedCity && (
              <div className="text-error">You mast select city</div>
            ))}
          {selectedCountry?.label == "" && (
            <div className="text-error">You mast select country</div>
          )}
          {!re.test(String(formValue.email).toLowerCase()) && (
            <div className="text-error">Invalid email</div>
          )}
        </div>
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} type="submit">
            Apply
          </Button>
        </div>
      </div>
    </form>
  );
};
