import { makeAutoObservable } from "mobx";

class AuthStore {
  selectedTimePoint: null | object = null;

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
