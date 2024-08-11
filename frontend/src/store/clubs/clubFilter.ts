import { makeAutoObservable } from "mobx";

class ClubFilterStore {
  isOpen = false;
  name: string = "";
  city: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
  toggleIsOpen() {
    this.setIsOpen(!this.isOpen);
  }
  changeName(newValue: string) {
    this.name = newValue;
  }
  changeCity(newValue: string) {
    this.city = newValue;
  }
}

export default new ClubFilterStore();
