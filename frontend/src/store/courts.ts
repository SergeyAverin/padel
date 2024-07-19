import { deleteCourt, getCourtsByClubId } from "@dal/court";
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
  async deleteCourt(courtId: number) {
    this.courts = this.courts.filter((obj) => obj.id !== courtId);
    await deleteCourt(courtId);
  }
}

export default new CourtStore();
