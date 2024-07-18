import { makeAutoObservable } from "mobx";

class AuthStore {
  selectedTimePoint: null | object = null;

  constructor() {
    makeAutoObservable(this);
  }

  async selectTimePoint(selectedTimePoint: object) {
    this.selectedTimePoint = selectedTimePoint;
  }
}

export default new AuthStore();
