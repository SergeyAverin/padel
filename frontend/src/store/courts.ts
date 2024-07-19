import {
  createCourt,
  deleteCourt,
  getClubCanCreateMatch,
  getCourtsByClubId,
} from "@dal/court";
import { IClub } from "@schemas/club";
import { ICourt } from "@schemas/courts";
import { makeAutoObservable } from "mobx";

class CourtStore {
  courts: Array<ICourt> = [];
  clubCanCreateMatch: Array<IClub> = [];

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
  async createCourt(courtName: string, clubId: number) {
    const court = await createCourt(courtName, clubId);
    this.courts.push(court);
  }
  async getClubCanCreateMatch() {
    this.clubCanCreateMatch = await getClubCanCreateMatch();
  }
}

export default new CourtStore();
