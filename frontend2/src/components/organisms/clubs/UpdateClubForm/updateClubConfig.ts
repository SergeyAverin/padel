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
];

export const initialState: FormDataI = {
  name: "",
  address: "",
};

export const getInitState = (club: IClub | null): FormDataI => {
  if (club) {
    return {
      name: club.name,
      address: club.city,
    };
  } else {
    return {
      name: initialState.name,
      address: initialState.address,
    };
  }
  return initialState;
};

export type FormDataI = {
  name: string;
  address: string;
};
