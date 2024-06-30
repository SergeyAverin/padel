import { makeAutoObservable, runInAction } from "mobx";

import { getFriendRequests, createFriendRequest } from "@dal/friendRequest";
import { IFriendRequest } from "@schemas/friendRequest";

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
  async createFriendRequest(userId: string) {
    const friendRequest = await createFriendRequest(userId);
    this.friendRequests.push(friendRequest);
  }
}

export default new FriendRequestsStore();
