import { makeAutoObservable, runInAction } from "mobx";

import { getFriendRequests } from "../dal/friendRequest";
import { IFriendRequest } from "src/types/friendRequest";

class FriendRequestsStore {
  isLoading = false;
  friendRequests: Array<IFriendRequest> = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getFriendRequests() {
    this.isLoading = true;
    runInAction(async () => {
      this.friendRequests = await getFriendRequests();
      this.isLoading = false;
    });
  }
}

export default new FriendRequestsStore();
