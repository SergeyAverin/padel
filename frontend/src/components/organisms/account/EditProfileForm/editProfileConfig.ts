interface IConfig {
  name: string;
  placeholder: string;
}
export const config: Array<IConfig> = [
  {
    name: "username",
    placeholder: "username",
  },
  {
    name: "first_name",
    placeholder: "first_name",
  },
  {
    name: "last_name",
    placeholder: "last_name",
  },
];

export const initialState: FormDataI = {
  username: "",
  first_name: "",
  last_name: "",
};

export type FormDataI = {
  username: string;
  first_name: string;
  last_name: string;
};
