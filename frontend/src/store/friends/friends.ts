import { makeAutoObservable, runInAction } from "mobx";

import { getUserFriends, unUserFriends, findUser } from "@dal/friends/friends";
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
  async setFoundUser(users: Array<IUser>) {
    this.foundUsers = users;
  }
  async setLoading(isLoading: boolean) {
    this.isFindUserLoading = isLoading;
  }
  async findUser(username: string) {
    this.isFindUserLoading = true;
    runInAction(async () => {
      try {
        const data = await findUser(username);
        await this.setFoundUser(data);
      } finally {
        this.setLoading(false);
      }
    });
  }
}

export default new FriendStore();
