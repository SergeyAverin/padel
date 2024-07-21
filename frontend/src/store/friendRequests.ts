import { makeAutoObservable, runInAction } from "mobx";

import {
  getInnerFriendRequests,
  getOuterFriendRequests,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from "@dal/friendRequest";
import { IFriendRequest } from "@schemas/friendRequest";
import FriendStore from "@store/friends";

class FriendRequestsStore {
  isLoading = true;
  friendRequestsInner: Array<IFriendRequest> = [];
  friendRequestsOuter: Array<IFriendRequest> = [];

  constructor() {
    makeAutoObservable(this);
  }

  private removeFriendRequest(friendRequestId: number) {
    this.friendRequestsInner = this.friendRequestsInner.filter(
      (friendRequest) => friendRequest.id !== friendRequestId
    );
  }

  private removeFriendRequestOuter(friendRequestId: number) {
    this.friendRequestsOuter = this.friendRequestsOuter.filter(
      (friendRequest) => friendRequest.id !== friendRequestId
    );
  }

  private appendFriendRequest(friendRequest: IFriendRequest) {
    this.friendRequestsOuter.push(friendRequest);
  }

  async getInnerFriendRequests() {
    runInAction(async () => {
      this.friendRequestsInner = await getInnerFriendRequests();
    });
  }

  async getOuterFriendRequests() {
    runInAction(async () => {
      this.friendRequestsOuter = await getOuterFriendRequests();
    });
  }

  async createFriendRequest(userId: string) {
    const friendRequest = await createFriendRequest(userId);
    this.appendFriendRequest(friendRequest);
    return friendRequest.id;
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
    this.removeFriendRequestOuter(friendRequestId);
  }

  async loadingRequests() {
    this.isLoading = true;
    runInAction(async () => {
      this.getInnerFriendRequests();
      this.getOuterFriendRequests();
      this.isLoading = false;
    });
  }
}

export default new FriendRequestsStore();
