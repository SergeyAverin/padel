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
  // registration_address: "",
};

export type FormDataI = {
  name: string;
  address: string;
  // registration_address: string;
};
