import { makeAutoObservable, runInAction } from "mobx";

import { getMatchByUserId } from "@dal/match";
import { IMatch } from "@schemas/match";

class MatchStore {
  isLoading = false;
  matches: Array<IMatch> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async getUserInfo(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.matches = await getMatchByUserId(userId);
      this.isLoading = false;
    });
  }
}

export default new MatchStore();
