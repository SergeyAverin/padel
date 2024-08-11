import { makeAutoObservable } from "mobx";

import {
  getTags,
  getFriendTags,
  addTag,
  removeTag,
  deleteTag,
  createTag,
} from "@dal/friends/tags";
import { ITag } from "@schemas/tags";

class TagsStore {
  tags: Array<ITag> = [];
  filterTags: Array<ITag> = [];
  friendsWithTags: Map<string, Array<ITag>> = new Map();

  constructor() {
    makeAutoObservable(this);
  }
  async addFilter(tag: ITag) {
    if (this.filterTags.indexOf(tag) < 0) {
      this.filterTags.push(tag);
    }
  }
  async removeFilter(tag: ITag) {
    this.filterTags = this.filterTags.filter(
      (tagFilter) => tagFilter.id !== tag.id
    );
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
