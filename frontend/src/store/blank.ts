import { makeAutoObservable, runInAction } from "mobx";

import { getMatchWithOutBlank } from "@dal/blank";
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
}

export default new MatchStore();
