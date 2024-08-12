import React, { ChangeEvent, useState } from "react";

import { config, FormDataI, getInitState } from "./editProfileConfig";
import { Button, ButtonVariant, Input } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import SelectCountry from "@molecules/core/SelectCountry";

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

  const [country, setCountry] = useState("");

  return (
    <form>
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

        <div className="mt-5">
          <SelectCountry setCountry={setCountry} />
        </div>

        <div className="mt-5">
          {formValue.age <= 0 && <div className="text-error">Invalid age</div>}

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
