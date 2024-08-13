import { IClub } from "@schemas/club";

interface IConfig {
  name: string;
  placeholder: string;
}
export const config: Array<IConfig> = [
  {
    name: "name",
    placeholder: "username",
  },
  {
    name: "address",
    placeholder: "first_name",
  },
  // {
  //   name: "registration_address",
  //   placeholder: "last_name",
  // },
  {
    name: "city",
    placeholder: "city",
  },
];

export const initialState: FormDataI = {
  name: "",
  address: "",
  // registration_address: "",
  city: "",
};

export const getInitState = (club: IClub | null): FormDataI => {
  if (club) {
    return {
      name: club.name,
      address: club.city,
      city: club.city,
    };
  } else {
    return {
      name: initialState.name,
      address: initialState.address,
      city: initialState.city,
    };
  }
  return initialState;
};

export type FormDataI = {
  name: string;
  address: string;
  // registration_address: string;
  city: string;
};
