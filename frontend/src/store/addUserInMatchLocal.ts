import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";

class AddUserInMatchLocal {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  setUser(user: IUser | null) {
    this.user = user;
  }
}

export default AddUserInMatchLocal;
