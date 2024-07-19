import UserStore from "@store/user";

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
    name: "city",
    placeholder: "city",
  },
  {
    name: "country",
    placeholder: "country",
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
};

export const getInitState = (): FormDataI => {
  if (UserStore.user) {
    return {
      username: UserStore.user.username,
      first_name: UserStore.user.first_name,
      last_name: UserStore.user.last_name,
      age: UserStore.user.age,
      email: UserStore.user.email,
      city: UserStore.user.city,
      country: UserStore.user.country,
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
};
