import { makeAutoObservable, runInAction } from "mobx";

import {
  getInnerFriendRequests,
  getOuterFriendRequests,
  createFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from "@dal/friends/friendRequest";
import { IFriendRequest } from "@schemas/friendRequest";
import FriendStore from "@store/friends/friends";
import AuthStore from "@store/account/auth";

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
    this.removeFriendRequest(friendRequestId);
    await acceptFriendRequest(friendRequestId);
    if (AuthStore.authUser) {
      FriendStore.getFriends(AuthStore.authUser.telegram_user_id);
    }
  }

  async rejectFriendRequest(friendRequestId: number) {
    this.removeFriendRequest(friendRequestId);
    await rejectFriendRequest(friendRequestId);
  }

  async cancelFriendRequest(friendRequestId: number) {
    this.removeFriendRequestOuter(friendRequestId);
    await cancelFriendRequest(friendRequestId);
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
