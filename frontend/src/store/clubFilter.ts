import { makeAutoObservable } from "mobx";

class ClubFilterStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}

export default new ClubFilterStore();
