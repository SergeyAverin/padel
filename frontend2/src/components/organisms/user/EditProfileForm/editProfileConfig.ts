import { IUser } from "@schemas/user";

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
  {
    name: "age",
    placeholder: "age",
  },
  {
    name: "email",
    placeholder: "age",
  },
  {
    name: "country",
    placeholder: "country",
  },
  {
    name: "city",
    placeholder: "city",
  },
  {
    name: "gender",
    placeholder: "gender",
  },
];

export const initialState: FormDataI = {
  username: "",
  first_name: "",
  last_name: "",
  age: 0,
  email: "",
  city: "",
  country: "",
  gender: "",
};

export const getInitState = (user: IUser | null): FormDataI => {
  if (user) {
    return {
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      email: user.email,
      city: user.city,
      country: user.country,
      gender: user.gender,
    };
  } else {
    return initialState;
  }
};

export type FormDataI = {
  username: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  city: string;
  country: string;
  gender: string;
};
