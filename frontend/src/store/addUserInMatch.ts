import { addUserInMatch } from "@dal/addUserInMatch";
import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";
import React from "react";
import AddUserInMatchLocal from "./addUserInMatchLocal";
import { getUserInfo } from "@dal/user";

class AddUserInMatchStore {
  isOpen = false;
  index = 0;
  matchId = 0;
  userInMatchRef: IUser | null = null;
  userStore: AddUserInMatchLocal | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }
  setIndex(
    selectedIndex: number,
    matchId: number,
    userStore: AddUserInMatchLocal
  ) {
    this.index = selectedIndex;
    this.matchId = matchId;
    this.userStore = userStore;
  }
  async setUser(user_id: string) {
    await addUserInMatch(this.matchId, user_id, this.index);
    if (this.userStore) {
      console.log(user_id);
      if (user_id != "-1") {
        const user = await getUserInfo(user_id);
        this.userStore.setUser(user);
      } else {
        this.userStore.setUser(null);
      }
    }
  }
  async setUserInMatchRef(nodeRef: IUser) {
    this.userInMatchRef = nodeRef;
  }
}

export default new AddUserInMatchStore();
