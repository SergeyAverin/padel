import {
  createCourt,
  deleteCourt,
  getClubCanCreateMatch,
  getCourtsByClubId,
} from "@dal/clubs/court";
import { IClub } from "@schemas/club";
import { ICourt } from "@schemas/courts";
import { makeAutoObservable } from "mobx";

class CourtStore {
  courts: Array<ICourt> = [];
  clubCanCreateMatch: Array<IClub> = [];

  constructor() {
    makeAutoObservable(this);
  }
  setCourt(court: Array<ICourt>) {
    this.courts = court;
  }
  async getCourts(clubId: number) {
    const data = await getCourtsByClubId(clubId);
    this.setCourt(data);
  }
  async deleteCourt(courtId: number) {
    this.courts = this.courts.filter((obj) => obj.id !== courtId);
    await deleteCourt(courtId);
  }
  async pushCourts(court: ICourt) {
    this.courts.push(court);
  }
  async createCourt(courtName: string, clubId: number) {
    const court = await createCourt(courtName, clubId);
    this.pushCourts(court);
  }
  async setClubCanCreateMatch(courts: Array<IClub>) {
    this.clubCanCreateMatch = courts;
  }
  async getClubCanCreateMatch() {
    const data = await getClubCanCreateMatch();
    this.setClubCanCreateMatch(data);
  }
}

export default new CourtStore();
