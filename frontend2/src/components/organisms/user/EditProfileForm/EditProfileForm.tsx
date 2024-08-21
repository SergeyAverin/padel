import React, { ChangeEvent, useEffect, useState } from "react";

import { config, FormDataI, getInitState } from "./editProfileConfig";
import { Button, ButtonVariant, Input } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
// import SelectCountry from "@molecules/core/SelectCountry";
// import { SelectCity } from "@molecules/core/SelectCity/SelectCity";
import { useNavigate } from "react-router-dom";
import { useUpdateUserInfoMutation } from "@redux/api/userApi";

export const EditProfileForm: React.FC = () => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const user = useAuthUser();

  const [formValue, setFormValue] = useState<FormDataI>(getInitState(user));
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormDataI;
    const value = e.target.value;
    setFormValue((prev) => ({ ...prev, [name]: value.trim() }));
  };
  // const [country, setCountry] = useState("");
  // const [city, setCity] = useState("");

  useEffect(() => {
    setFormValue(getInitState(user));
    // if (user) {
    //   setCity(user.city);
    //   setCountry(user.country);
    // }
  }, [user]);

  const navigate = useNavigate();
  const [updateUser] = useUpdateUserInfoMutation();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      re.test(String(formValue.email)) &&
      formValue.age > 0
      // city &&
      // country
    ) {
      if (user) {
        updateUser({
          userData: {
            ...formValue,
          },
          userId: user.telegram_user_id,
        });
      }
      navigate("/profile");
    } else {
      alert("Write a valid data!!!");
    }
  };
  useEffect(() => {
    if (formValue.city == "" && formValue.country == "") {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            setFormValue((prev) => ({ ...prev, city: data.city } as FormDataI));
            setFormValue(
              (prev) => ({ ...prev, country: data.countryName } as FormDataI)
            );
          });
      });
    }
  }, []);
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

        {/* <div className="mt-5">
          <SelectCountry setCountry={setCountry} country={user?.country} />
        </div>

        <div className="mt-5">
          <SelectCity
            setCity={setCity}
            selectedCountry={country}
            city={user?.city}
          />
        </div> */}

        <div className="mt-5">
          {formValue.age <= 0 && <div className="text-error">Invalid age</div>}

          {!re.test(String(formValue.email).toLowerCase()) && (
            <div className="text-error">Invalid email</div>
          )}
          {/* {country == "" ||
            (!city && <div className="text-error">You mast select city</div>)}
          {country == "" && (
            <div className="text-error">You mast select country</div>
          )} */}
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
