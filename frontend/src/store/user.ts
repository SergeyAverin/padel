import { makeAutoObservable, runInAction } from "mobx";

import { getUserInfo, changeHand, changePosition, updateUser } from "@dal/user";
import { Hand, IUpdateUserData, IUser, Position } from "@schemas/user";

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
  async changePosition(position: Position) {
    await changePosition("3", position);
  }
  async updateUser(userId: string, data: IUpdateUserData) {
    await updateUser(userId, data);
    await this.getUserInfo(userId);
  }
}

export default new UserStore();
