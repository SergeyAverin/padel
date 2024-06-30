import { makeAutoObservable, runInAction } from "mobx";

import {
  getFriendRequests,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from "@dal/friendRequest";
import { IFriendRequest } from "@schemas/friendRequest";
import FriendStore from "@store/friends";

class FriendRequestsStore {
  isLoading = false;
  friendRequests: Array<IFriendRequest> = [];

  constructor() {
    makeAutoObservable(this);
  }

  private removeFriendRequest(friendRequestId: number) {
    this.friendRequests = this.friendRequests.filter(
      (friendRequest) => friendRequest.id !== friendRequestId
    );
  }

  private appendFriendRequest(friendRequest: IFriendRequest) {
    this.friendRequests.push(friendRequest);
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
    this.appendFriendRequest(friendRequest);
  }

  async acceptFriendRequest(friendRequestId: number) {
    await acceptFriendRequest(friendRequestId);
    this.removeFriendRequest(friendRequestId);
    FriendStore.getFriends("321");
  }

  async rejectFriendRequest(friendRequestId: number) {
    await rejectFriendRequest(friendRequestId);
    this.removeFriendRequest(friendRequestId);
  }

  async cancelFriendRequest(friendRequestId: number) {
    await cancelFriendRequest(friendRequestId);
    this.removeFriendRequest(friendRequestId);
  }
}

export default new FriendRequestsStore();
