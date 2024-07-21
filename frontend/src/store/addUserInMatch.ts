import { addUserInMatch } from "@dal/addUserInMatch";
import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";
import React from "react";

class AddUserInMatchStore {
  isOpen = false;
  index = 0;
  matchId = 0;
  userInMatchRef: IUser | null = null;
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
  async setUserInMatchRef(nodeRef: IUser) {
    this.userInMatchRef = nodeRef;
  }
}

export default new AddUserInMatchStore();
