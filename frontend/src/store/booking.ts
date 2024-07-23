import { getMatchByDay } from "@dal/match";
import { IClub } from "@schemas/club";
import { IMatch } from "@schemas/match";
import { makeAutoObservable } from "mobx";

class AuthStore {
  selectedTimePoint: null | object = null;
  startAt: string = "00:00";
  endAt: string = "00:00";
  selectedClubId: null | string = null;
  selectedData: null | string = null;
  courtOption: {
    value: string;
    label: string;
  }[] = [];
  selectedCourt: null | string = null;
  matches: Array<IMatch> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async selectClub(club: string) {
    this.selectedClubId = club;
  }

  async setCourtOption(
    courtOption: {
      value: string;
      label: string;
    }[]
  ) {
    this.courtOption = courtOption;
  }

  async selectDate(date: string) {
    this.selectedData = date;
  }

  async setSelectCourt(court: string) {
    this.selectedCourt = court;
  }

  async selectStartAt(startAt: string) {
    this.startAt = startAt;
  }
  async selectEndAt(endAt: string) {
    this.endAt = endAt;
  }

  async selectTimePoint(selectedTimePoint: object) {
    if (
      this.selectedTimePoint == null ||
      this.selectedTimePoint.court != selectedTimePoint.court
    ) {
      this.selectedTimePoint = selectedTimePoint;
    } else {
      this.selectedTimePoint = null;
    }
  }

  async getMatchByDay(clubId: number, day: number, month: number) {
    this.matches = await getMatchByDay(clubId, day, month);
    this.matches.forEach((item) => {
      console.log(item);
    });
  }
}

export default new AuthStore();
