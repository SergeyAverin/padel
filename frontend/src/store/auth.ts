import { makeAutoObservable } from "mobx";

import { login } from "@dal/auth";
import { IUser } from "@schemas/user";
import { getUserInfo } from "@dal/user";
import ClubFilterStore from "@store/clubFilter";
// import UserStore from "./user";

class AuthStore {
  isLogin: boolean = false;
  authUser: IUser | null = null;
  token: string = "";
  constructor() {
    makeAutoObservable(this);
  }

  async login(userId: string) {
    await login(userId);
    this.isLogin = true;
    // await UserStore.getUser();
  }
  async setAuth() {
    this.isLogin = true;
  }
  async acceptUser() {
    if (Telegram.WebApp.initDataUnsafe.user) {
      this.authUser = await getUserInfo(
        String(Telegram.WebApp.initDataUnsafe.user.id)
      );
    }
    if (this.authUser) {
      ClubFilterStore.changeCity(this.authUser.city);
    }
  }
}

export default new AuthStore();
