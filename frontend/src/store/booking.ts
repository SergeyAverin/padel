import { getClubById } from "@dal/club";
import { createMatch, getMatchByDay } from "@dal/match";
import { IClub } from "@schemas/club";
import { IMatch } from "@schemas/match";
import { extractDayAndMonth } from "@utils/dateUtils";
import { extractTime, getHoursInRange } from "@utils/timeUtils";
import { makeAutoObservable } from "mobx";

class AuthStore {
  selectedTimePoint: null | { court: number } = null;
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
  breakPoints: Array<{
    startAt: number;
    endAt: number;
    courtIndex: number;
  }> = [];
  lvlMin: string = "0";
  lvlMax: string = "0";
  opening: string = "08:00";
  closing: string = "23:00";

  constructor() {
    makeAutoObservable(this);
  }

  private async setBreakPoints() {
    const arr: Array<{
      startAt: number;
      endAt: number;
      courtIndex: number;
    }> = [];
    await this.matches.forEach(async (i) => {
      const startAt = extractTime(String(i.start_at));
      const endAt = extractTime(String(i.end_at));

      if (this.selectedClubId) {
        const club = (await getClubById(this.selectedClubId)) as IClub;
        const timeRange = getHoursInRange(club.opening, club.closing);
        timeRange.map((i) => console.log(i));
        const getIndexInTimeRange = (time: string) => {
          return timeRange.indexOf(time);
        };

        const courtIndex = this.courtOption.findIndex(
          (item) => item.value == String(i.selected_court_id)
        );
        arr.push({
          startAt: getIndexInTimeRange(startAt) + 2,
          endAt: getIndexInTimeRange(endAt) + 3,
          courtIndex: courtIndex + 2,
        });
        this.breakPoints = arr;
      }
    });
  }

  async selectClub(club: string) {
    this.selectedClubId = club;
    const res = await getClubById(club);
    this.opening = res.opening;
    this.closing = res.closing;
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

  async selectTimePoint(selectedTimePoint: {
    court: number;
    timeEnd: number;
    timeStart: number;
  }) {
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
    this.setBreakPoints();
  }
  async setLvlMin(lvl: string) {
    this.lvlMin = lvl;
  }
  async setLvlMax(lvl: string) {
    this.lvlMax = lvl;
  }
  async createMatch(
    startAt: Date,
    endAt: Date,
    clubId: number,
    courtId: number,
    isPrivate: boolean,
    selectedTagId: number | null
  ) {
    const timeRange = getHoursInRange("08:00", "18:00");
    const getIndexInTimeRange = (time: string) => {
      return timeRange.indexOf(time);
    };
    if (courtId) {
      const court = courtId + 2;
      const filteredBreakPoints = this.breakPoints.filter((item) => {
        return item.courtIndex == court;
      });

      filteredBreakPoints.forEach((item) => {
        console.log(getIndexInTimeRange(this.startAt) + 2);
        console.log(getIndexInTimeRange(this.startAt) + 2);
        console.log();
        console.log(item.startAt);
        console.log(item.endAt);
      });
    }
    const res = await createMatch(
      startAt,
      endAt,
      clubId,
      courtId,
      `${this.lvlMin}-${this.lvlMax}`,
      isPrivate,
      selectedTagId
    );
    this.matches.push(res);

    if (this.selectedData) {
      const d = extractDayAndMonth(this.selectedData);
      this.selectStartAt("00:00");
      this.selectEndAt("00:00");
      this.getMatchByDay(Number(this.selectedClubId), d[0], d[1]);
    }
  }
}

export default new AuthStore();
