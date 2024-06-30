import { makeAutoObservable, runInAction } from "mobx";

import { getUserFriends } from "@dal/friends";
import { IUser } from "@schemas/user";

class FriendStore {
  isLoading = false;
  friends: Array<IUser> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getFriends(FriendId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.friends = await getUserFriends(FriendId);
      this.isLoading = false;
    });
  }
}

export default new FriendStore();
