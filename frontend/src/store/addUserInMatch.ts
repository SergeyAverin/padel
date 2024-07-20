import { addUserInMatch } from "@dal/addUserInMatch";
import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";

class AddUserInMatchStore {
  isOpen = false;
  index = 0;
  matchId = 0;
  constructor() {
    makeAutoObservable(this);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
  setIndex(selectedIndex: number, matchId: number) {
    this.index = selectedIndex;
    this.matchId = matchId;
  }
  async setUser(user_id: string) {
    await addUserInMatch(this.matchId, user_id, this.index);
  }
}

export default new AddUserInMatchStore();
