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

export type FormDataI = {
  name: string;
  address: string;
  registration_address: string;
  city: string;
};
