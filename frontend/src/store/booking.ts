import { makeAutoObservable } from "mobx";

class AuthStore {
  selectedTimePoint: null | object = null;
  startAt: string = "00:00";
  endAt: string = "00:00";

  constructor() {
    makeAutoObservable(this);
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
}

export default new AuthStore();
