import { getCourtsByClubId } from "@dal/court";
import { ICourt } from "@schemas/courts";
import { makeAutoObservable } from "mobx";

class CourtStore {
  courts: Array<ICourt> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async getCourts(clubId: number) {
    this.courts = await getCourtsByClubId(clubId);
  }
}

export default new CourtStore();
