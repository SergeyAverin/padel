import { makeAutoObservable, runInAction } from "mobx";

import {
  getUserInfo,
  changeHand,
  changePosition,
  updateUser,
  getStats,
  uploadPhoto,
} from "@dal/user";
import {
  Hand,
  IUpdateUserData,
  IUser,
  IUserStats,
  Position,
} from "@schemas/user";
import AuthStore from "@store/auth";
import { getRelationStatus } from "@dal/friends";

class UserStore {
  isLoading = false;
  user: IUser | null = null;
  stats: IUserStats | null = null;
  relationStatus: string = "its_me";

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
    if (AuthStore.authUser) {
      await changeHand(AuthStore.authUser.telegram_user_id, hand);
    }
  }
  async changePosition(position: Position) {
    if (AuthStore.authUser) {
      await changePosition(AuthStore.authUser.telegram_user_id, position);
    }
  }
  async updateUser(userId: string, data: IUpdateUserData) {
    await updateUser(userId, data);
    await this.getUserInfo(userId);
  }
  async getStats(userId: string) {
    this.stats = await getStats(userId);
  }
  async uploadPhoto(userId: string, photo: FormData) {
    await uploadPhoto(userId, photo);
    await this.getUserInfo(userId);
  }
  async getRelationStatus(userId: string) {
    this.relationStatus = await getRelationStatus(userId);
  }
}

export default new UserStore();
