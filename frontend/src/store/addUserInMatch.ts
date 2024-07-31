import { addTestUserInMatch, addUserInMatch } from "@dal/addUserInMatch";
import { IUser } from "@schemas/user";
import { makeAutoObservable } from "mobx";
import AuthStore from "@store/auth";
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
  async setUser(user_id: string, isTextUser: boolean = false) {
    if (!isTextUser) {
      await addUserInMatch(this.matchId, user_id, this.index);
    } else {
      await addTestUserInMatch(this.matchId, user_id, this.index);
    }
    if (!isTextUser) {
      if (this.userStore) {
        if (user_id != "-1") {
          const user = await getUserInfo(user_id);
          this.userStore.setUser(user);
        } else {
          this.userStore.setUser(null);
        }
      }
    } else {
      if (this.userStore) {
        this.userStore.setUser(user_id);
      }
    }
  }
  async joinInMatch(index: number) {
    if (AuthStore.authUser) {
      await addUserInMatch(
        this.matchId,
        AuthStore.authUser.telegram_user_id,
        index
      );
      if (this.userStore) {
        this.userStore.setUser(AuthStore.authUser);
      }
    }
  }
  async leveMatch(index: number) {
    if (AuthStore.authUser) {
      await addUserInMatch(this.matchId, "-1", index);
      if (this.userStore) {
        this.userStore.setUser(null);
      }
    }
  }
  async setUserInMatchRef(nodeRef: IUser) {
    this.userInMatchRef = nodeRef;
  }
}

export default new AddUserInMatchStore();
