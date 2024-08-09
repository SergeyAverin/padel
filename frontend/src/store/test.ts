import { makeAutoObservable } from "mobx";

import { testHello } from "@dal/test";

class TagsStore {
  count: number = 0;
  msg: string = "";
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  incr() {
    this.count += 1;
  }
  dect() {
    this.count -= 1;
  }
  async testHello() {
    this.isLoading = true;
    const msg = await testHello();
    this.msg = msg;
    this.isLoading = false;
  }
}

export default new TagsStore();
