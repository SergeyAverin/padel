import { getClubById } from "@dal/club";
import { createMatch, getMatchByDay } from "@dal/match";
import { IClub } from "@schemas/club";
import { IMatch } from "@schemas/match";
import { extractDayAndMonth } from "@utils/dateUtils";
import { extractTime, getHoursInRange } from "@utils/timeUtils";
import { makeAutoObservable } from "mobx";
import CourtStore from "@store/courts";

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
  isLoadingDesk = false;

  constructor() {
    makeAutoObservable(this);
  }

  private async setBreakPoints() {
    const arr: Array<{
      startAt: number;
      endAt: number;
      courtIndex: number;
    }> = [];
    this.isLoadingDesk = true;
    if (this.selectedClubId) {
      const club = (await getClubById(this.selectedClubId)) as IClub;
      await this.matches.forEach(async (i) => {
        const startAt = extractTime(String(i.start_at));
        const endAt = extractTime(String(i.end_at));

        const timeRange = getHoursInRange(club.opening, club.closing);
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
      });
    }
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
    console.log(`get matches from date ${day} ${month}`);
    this.matches = await getMatchByDay(clubId, day, month);
    this.setBreakPoints().then(() => {
      this.isLoadingDesk = false;
    });
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
    if (this.selectedClubId) {
      const club = (await getClubById(this.selectedClubId)) as IClub;

      const timeRange = getHoursInRange(club.opening, club.closing);
      const getIndexInTimeRange = (time: string) => {
        return timeRange.indexOf(time);
      };
      let flag = true;
      if (courtId) {
        const court = CourtStore.courts.findIndex((i) => i.id == courtId) + 2;
        const filteredBreakPoints = this.breakPoints.filter((item) => {
          console.log(item.courtIndex);
          return item.courtIndex == court;
        });
        filteredBreakPoints.forEach((item) => {
          console.log(
            `[${getIndexInTimeRange(this.startAt) + 2}, ${
              getIndexInTimeRange(this.endAt) + 2
            }]`
          );
          console.log(`[${item.startAt}, ${item.endAt - 1}]`);
          console.log(
            checkIntersection(
              getIndexInTimeRange(this.startAt) + 2,
              getIndexInTimeRange(this.endAt) + 2,
              item.startAt,
              item.endAt - 1
            )
          );
          if (
            checkIntersection(
              getIndexInTimeRange(this.startAt) + 2,
              getIndexInTimeRange(this.endAt) + 2,
              item.startAt,
              item.endAt - 1
            )
          ) {
            flag = false;
          }
        });
      }
      console.log(`you can create mathc ${flag}`);
      if (flag) {
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
        return true;
      } else {
        alert("It is not possible to create a match at the specified time!");
        return false;
      }
    }
  }
}

export default new AuthStore();
function checkIntersection(
  a1: number,
  b1: number,
  a2: number,
  b2: number
): boolean {
  // Сортируем начала диапазонов по возрастанию
  const [start1, start2] = a1 <= a2 ? [a1, a2] : [a2, a1];

  // Сортируем концы диапазонов по возрастанию
  const [end1, end2] = b1 <= b2 ? [b1, b2] : [b2, b1];

  // Проверяем пересечение
  return Math.max(start1, start2) <= Math.min(end1, end2);
}
