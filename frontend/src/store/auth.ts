import { makeAutoObservable } from "mobx";

import { login } from "@dal/auth";
// import UserStore from "./user";

class AuthStore {
  isLogin: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  async login(userId: string) {
    this.isLogin = true;
    await login(userId);
    // await UserStore.getUser();
  }
  async setAuth() {
    this.isLogin = true;
  }
}

export default new AuthStore();
