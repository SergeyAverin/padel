import { makeAutoObservable, runInAction } from "mobx";

import {
  getUserInfo,
  changeHand,
  changePosition,
  updateUser,
  getStats,
  uploadPhoto,
  changeLvl,
} from "@dal/accounts/user";
import {
  Hand,
  IUpdateUserData,
  IUser,
  IUserStats,
  Position,
} from "@schemas/user";
import AuthStore from "@store/account/auth";
import { getRelationStatus } from "@dal/friends/friends";

class UserStore {
  isLoading = false;
  user: IUser | null = null;
  stats: IUserStats | null = null;
  relationStatus: string = "its_me";

  constructor() {
    makeAutoObservable(this);
  }
  async setUser(user: IUser | null) {
    this.user = user;
  }
  async getUserInfo(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      try {
        const data = await getUserInfo(userId);
        await this.setUser(data);
      } finally {
        this.isLoading = false;
      }
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
  async setStats(stats: IUserStats) {
    this.stats = stats;
  }
  async getStats(userId: string) {
    const data = await getStats(userId);
    await this.setStats(data);
  }
  async uploadPhoto(userId: string, photo: FormData) {
    await uploadPhoto(userId, photo);
    await this.getUserInfo(userId);
  }
  async setRelationStatus(status: string) {
    this.relationStatus = status;
  }
  async getRelationStatus(userId: string) {
    const status = await getRelationStatus(userId);
    this.setRelationStatus(status);
  }
  async changeLvl(lvl: number) {
    await changeLvl(lvl);
  }
}

export default new UserStore();
