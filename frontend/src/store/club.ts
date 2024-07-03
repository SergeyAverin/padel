import { makeAutoObservable, runInAction } from "mobx";

import {
  getClubs,
  getClubsByBookmark,
  getIsClubBookmarked,
  addClubInUserBookmarks,
  removeClubFromUserBookmark,
} from "@dal/club";
import { IClub } from "@schemas/club";

class ClubStore {
  isLoading = false;
  clubs: Array<IClub> = [];
  bookmarkedClubs: Array<IClub> = [];
  bookmarks: Map<number, boolean> = new Map();

  constructor() {
    makeAutoObservable(this);
  }
  getClubs() {
    this.isLoading = true;
    runInAction(async () => {
      this.clubs = await getClubs();
      this.isLoading = false;
    });
  }
  getBookedClubs() {
    this.isLoading = true;
    runInAction(async () => {
      this.bookmarkedClubs = await getClubsByBookmark();
      this.isLoading = false;
    });
  }
  async getIsBookmark(clubId: number) {
    const isBookmark = await getIsClubBookmarked(clubId);
    this.bookmarks.set(clubId, isBookmark);
  }
  async addBookmark(clubId: number) {
    await addClubInUserBookmarks(clubId);
    this.bookmarks.set(clubId, true);
    this.getBookedClubs();
  }
  async removeBookmark(clubId: number) {
    await removeClubFromUserBookmark(clubId);
    this.bookmarks.set(clubId, false);
    this.getBookedClubs();
  }
}

export default new ClubStore();
