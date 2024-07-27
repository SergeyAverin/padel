import { makeAutoObservable, runInAction } from "mobx";

import { createBlank, getMatchWithOutBlank } from "@dal/blank";
import { IMatch } from "@schemas/match";

class MatchStore {
  isLoading = true;
  matchWithOutBlank: Array<IMatch> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async loadMatchWithOutBlank() {
    this.isLoading = true;
    runInAction(async () => {
      this.matchWithOutBlank = await getMatchWithOutBlank();
      this.isLoading = false;
    });
  }
  async createBlank(
    matchId: number,
    usre1: number,
    usre2: number,
    usre3: number,
    usre4: number
  ) {
    this.matchWithOutBlank = this.matchWithOutBlank.filter(
      (match) => match.id !== matchId
    );
    await createBlank(matchId, usre1, usre2, usre3, usre4);
  }
}

export default new MatchStore();
