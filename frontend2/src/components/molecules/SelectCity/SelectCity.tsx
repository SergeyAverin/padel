import React, { useEffect, useState } from "react";
import { City } from "country-state-city";

import { Option } from "@atoms/Select/selectOption";
import { Label } from "@atoms/index";
import Select from "@atoms/Select";
import { generateRandomString } from "@utils/codeGenerate";

interface ISelectCityProps {
  setCity: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: string;
}

export const SelectCity: React.FC<ISelectCityProps> = ({
  setCity,
  selectedCountry,
}) => {
  const [selectedCity, setSelectedCity] = useState<null | Option>(null);
  const [cityOption, setCityOptions] = useState<Array<Option>>([]);

  useEffect(() => {
    if (selectedCountry) {
      const options = City.getCitiesOfCountry(selectedCountry);
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
    if (selectedCity) {
      setCity(selectedCity.value);
    }
  }, [selectedCity]);
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
