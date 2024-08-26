import React, { useEffect, useState } from "react";
import { countries } from "../SelectCountry/countries";

import { Option } from "@atoms/Select/selectOption";
import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { generateRandomString } from "@utils/codeGenerate";
import { useAuthUser } from "@hooks/useAuthUser";

interface ISelectCityProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: string;
  city: string | undefined;
}

export const SelectCity: React.FC<ISelectCityProps> = ({
  setCity,
  city,
  selectedCountry,
}) => {
  const [selectedCity, setSelectedCity] = useState<null | Option>(null);
  const [cityOption, setCityOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    if (selectedCountry) {
      const options =
        selectedCountry in countries ? countries[selectedCountry] : [];
      if (options) {
        const mapedOptions = options.map((city) => {
          return {
            label: city,
            value: generateRandomString(10),
          };
        });
        setCityOptions(mapedOptions);
        const c = cityOption.find((i) => i.value == city);
        if (c) {
          setSelectedCity(c);
        }
      }
    }
  }, [selectedCountry, city]);
  useEffect(() => {
    const c = cityOption.find((i) => i.label == city);
    console.log(123123123123);
    if (c) {
      setSelectedCity(c);
    }
  }, [cityOption]);
  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity.label);
    }
  }, [selectedCity]);
  const authUser = useAuthUser();
  useEffect(() => {
    if (authUser) {
      const country = cityOption.find((city) => {
        if (city.label == authUser?.city) {
          return city;
        }
      });
      if (country && country.value != selectedCity?.value) {
        setSelectedCity(country);
      }
    }
  }, [authUser]);

  useEffect(() => {
    // country == ""
    if (city == "") {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("data.city");
            console.log(data.city);
            const countryFromLocation: string = data.city.split(" ")[0];
            console.log(data.city.split(" ")[0]);
            const optionFromLocation = cityOption.find((i) => {
              if (
                i.label
                  .toLowerCase()
                  .startsWith(countryFromLocation.toLowerCase().substring(0, 3))
              ) {
                return true;
              }
            });
            console.log("optionFromLocation");
            console.log(optionFromLocation);
            if (optionFromLocation) {
              setSelectedCity(optionFromLocation);
            }
          });
      });
    }
  }, [cityOption]);

  return (
    <>
      <Label>Select City</Label>
      <Select
        options={cityOption}
        defaultValue={selectedCity}
        onChange={(option) => setSelectedCity(option)}
      />
    </>
  );
};
