import { makeAutoObservable } from "mobx";

class AddUserInMatchStore {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
}

export default new AddUserInMatchStore();
