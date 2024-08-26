import React, { useEffect, useState } from "react";
import { countries } from "./countries";

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
  const keys = Object.keys(countries);
  const countryOptions = keys.map((country) => ({
    label: country,
    value: country,
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
  useEffect(() => {
    // country == ""
    if (!country || country == "") {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            const countryFromLocation: string = data.countryName.split(" ")[0];
            const optionFromLocation = countryOptions.find((i) => {
              if (
                i.value
                  .toLowerCase()
                  .startsWith(countryFromLocation.toLowerCase().substring(0, 3))
              ) {
                return true;
              }
            });
            console.log(optionFromLocation);
            if (optionFromLocation) {
              setSelectedCountry(optionFromLocation);
            }
          });
      });
    }
  }, []);
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
