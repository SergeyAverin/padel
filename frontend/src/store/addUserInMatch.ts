import { makeAutoObservable } from "mobx";

class AddUserInMatchStore {
  isOpen = false;
  index = 0;

  constructor() {
    makeAutoObservable(this);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
  setIndex(selectedIndex: number) {
    this.index = selectedIndex;
  }
  setUser() {}
}

export default new AddUserInMatchStore();
