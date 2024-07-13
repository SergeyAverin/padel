import { makeAutoObservable, runInAction } from "mobx";

import { getUserFriends, unUserFriends, findUser } from "@dal/friends";
import { IUser } from "@schemas/user";

class FriendStore {
  isLoading = false;
  friends: Array<IUser> = [];
  foundUsers: Array<IUser> = [];

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
    await unUserFriends(FriendId);
    this.removeFriend(FriendId);
  }
  async findUser(username: string) {
    this.foundUsers = await findUser(username);
  }
}

export default new FriendStore();
