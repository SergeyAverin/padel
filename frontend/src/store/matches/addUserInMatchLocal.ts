import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";

class AddUserInMatchLocal {
  user: IUser | string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setUser(user: IUser | string | null) {
    this.user = user;
  }
}

export default AddUserInMatchLocal;
