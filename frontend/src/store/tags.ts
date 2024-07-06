import { makeAutoObservable } from "mobx";

import { getTags, getFriendTags } from "@dal/tags";
import { ITag } from "@schemas/tags";

class TagsStore {
  tags: Array<ITag> = [];
  friendsWithTags: Map<string, Array<ITag>> = new Map();

  constructor() {
    makeAutoObservable(this);
  }
  async getTags() {
    this.tags = await getTags();
  }
  async getFriendTags(userId: string) {
    const tags = await getFriendTags(userId);
    this.friendsWithTags.set(userId, tags);
  }
}

export default new TagsStore();
