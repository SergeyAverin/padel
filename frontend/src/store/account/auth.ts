import { makeAutoObservable } from "mobx";

import { login } from "@dal/accounts/auth";
import { Hand, IUpdateUserData, IUser, Position } from "@schemas/user";
import { getUserInfo } from "@dal/accounts/user";
import ClubFilterStore from "@store/clubs/clubFilter";
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
    // this.isLogin = true;
    this.setAuth();
    // await UserStore.getUser();
  }
  async setAuth() {
    this.isLogin = true;
  }
  async setAuthUser(user: IUser) {
    this.authUser = user;
  }
  async setHand(hand: Hand) {
    if (this.authUser) {
      this.authUser.hand = hand;
    }
  }
  async setPositon(positon: Position) {
    if (this.authUser) {
      this.authUser.position = positon;
    }
  }
  async acceptUser() {
    if (Telegram.WebApp.initDataUnsafe.user) {
      const data = await getUserInfo(
        String(Telegram.WebApp.initDataUnsafe.user.id)
      );
      await this.setAuthUser(data);
    }
    if (this.authUser) {
      ClubFilterStore.changeCity(this.authUser.city);
    }
  }
  async updateUserData(newUserData: IUpdateUserData) {
    if (this.authUser) {
      this.authUser.first_name = newUserData.first_name;
      this.authUser.last_name = newUserData.last_name;
      this.authUser.username = newUserData.username;
      this.authUser.email = newUserData.email;
      this.authUser.age = newUserData.age;
      this.authUser.city = newUserData.city;
      this.authUser.country = newUserData.country;
    }
  }
  async setAvatar(path: string) {
    if (this.authUser) {
      this.authUser.avatar = path;
    }
  }
  async setLvL(lvl: number) {
    if (this.authUser) {
      this.authUser.lvl = lvl;
    }
  }
}

export default new AuthStore();
