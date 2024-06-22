import { makeAutoObservable, runInAction } from "mobx";

import { getUserInfo } from "../dal/user";
import { IUser } from "../types/user";

class UserStore {
  isLoading = false;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  async getUserInfo(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.user = await getUserInfo(userId);
      this.isLoading = false;
    });
  }
}

export default new UserStore();
