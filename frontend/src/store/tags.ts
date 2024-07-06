import { makeAutoObservable } from "mobx";

import { getTags } from "@dal/tags";
import { ITag } from "@schemas/tags";

class TagsStore {
  tags: Array<ITag> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async getTags() {
    this.tags = await getTags();
  }
}

export default new TagsStore();
