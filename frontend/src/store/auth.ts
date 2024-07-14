import { makeAutoObservable } from "mobx";

import { login } from "@dal/auth";
import { IUser } from "@schemas/user";
import { getUserInfo } from "@dal/user";
// import UserStore from "./user";

class AuthStore {
  isLogin: boolean = false;
  authUser: IUser | null = null;
  token: string = "";
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
  async acceptUser() {
    this.authUser = await getUserInfo(Telegram.WebApp.initDataUnsafe.user.id);
    console.log(this.authUser);
  }
}

export default new AuthStore();
