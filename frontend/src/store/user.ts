import { makeAutoObservable, runInAction } from "mobx";

import { getUserInfo, changeHand } from "@dal/user";
import { Hand, IUser } from "@schemas/user";

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
  async changeHand(hand: Hand) {
    await changeHand("3", hand);
  }
}

export default new UserStore();
