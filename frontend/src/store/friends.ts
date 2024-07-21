import { makeAutoObservable, runInAction } from "mobx";

import { getUserFriends, unUserFriends, findUser } from "@dal/friends";
import { IUser } from "@schemas/user";

class FriendStore {
  isLoading = true;
  friends: Array<IUser> = [];
  foundUsers: Array<IUser> = [];
  isFindUserLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private removeFriend(friendId: string) {
    this.friends = this.friends.filter(
      (friend) => friend.telegram_user_id !== friendId
    );
  }

  async getFriends(FriendId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.friends = await getUserFriends(FriendId);
      this.isLoading = false;
    });
  }
  async unFriends(FriendId: string) {
    this.removeFriend(FriendId);
    await unUserFriends(FriendId);
  }
  async findUser(username: string) {
    this.isFindUserLoading = true;
    runInAction(async () => {
      this.foundUsers = await findUser(username);
      this.isFindUserLoading = false;
    });
  }
}

export default new FriendStore();
