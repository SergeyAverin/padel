import { makeAutoObservable, runInAction } from "mobx";

import { getMatchByClubId, getMatchByUserId } from "@dal/match";
import { IMatch } from "@schemas/match";

class MatchStore {
  isLoading = false;
  matches: Array<IMatch> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async loadUserMatches(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.matches = await getMatchByUserId(userId);
      this.isLoading = false;
    });
  }
  async loadClubMatches(clubId: number) {
    this.isLoading = true;
    runInAction(async () => {
      this.matches = await getMatchByClubId(clubId);
      this.isLoading = false;
    });
  }
}

export default new MatchStore();
