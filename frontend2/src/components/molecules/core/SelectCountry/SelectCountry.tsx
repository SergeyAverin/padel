import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";

import { Option } from "@atoms/Select/selectOption";
import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { useAuthUser } from "@hooks/useAuthUser";

interface ISelectCountryProps {
  country: string | undefined;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectCountry: React.FC<ISelectCountryProps> = ({
  setCountry,
  country,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<null | Option>(null);
  const countryOptions = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));
  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry.value);
    }
  }, [selectedCountry]);
  useEffect(() => {
    console.log(country);
    const c = countryOptions.find((i) => i.value == country);
    if (c) {
      setSelectedCountry(c);
    }
  }, [country]);
  const authUser = useAuthUser();
  useEffect(() => {
    if (authUser) {
      console.log(authUser?.country);
      const country = countryOptions.find((country) => {
        if (country.label == authUser?.country) {
          return country;
        }
      });
      if (country && country.value != selectedCountry?.value) {
        setSelectedCountry(country);
      }
    }
  }, [authUser]);
  return (
    <>
      <Label>Select country</Label>
      <Select
        options={countryOptions}
        defaultValue={selectedCountry}
        onChange={(option) => setSelectedCountry(option)}
      />
    </>
  );
};
