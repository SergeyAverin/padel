import ClubStore from "@store/club";

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
  {
    name: "registration_address",
    placeholder: "last_name",
  },
  {
    name: "city",
    placeholder: "age",
  },
];

export const initialState: FormDataI = {
  name: "",
  address: "",
  registration_address: "",
  city: "",
};

export const getInitState = (): FormDataI => {
  if (ClubStore.openedClub) {
    return {
      name: ClubStore.openedClub.name,
      address: ClubStore.openedClub.city,
      registration_address: ClubStore.openedClub.address,
      city: ClubStore.openedClub.registration_address,
    };
  } else {
    return initialState;
  }
};

export type FormDataI = {
  name: string;
  address: string;
  registration_address: string;
  city: string;
};