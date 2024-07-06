import { makeAutoObservable } from "mobx";

import {
  getTags,
  getFriendTags,
  addTag,
  removeTag,
  deleteTag,
  createTag,
} from "@dal/tags";
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
  async addTag(userId: string, tagId: number) {
    await addTag(userId, tagId);
    await this.getFriendTags(userId);
  }
  async removeTag(userId: string, tagId: number) {
    await removeTag(userId, tagId);
    await this.getFriendTags(userId);
  }
  async deleteTag(tagId: number) {
    await deleteTag(tagId);
    await this.getTags();
  }
  async createTag(tagName: string) {
    await createTag(tagName);
    await this.getTags();
  }
}

export default new TagsStore();
