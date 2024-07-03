import { makeAutoObservable, runInAction } from "mobx";

import { getClubs, getClubsByBookmark, getIsClubBookmarked } from "@dal/club";
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
}

export default new ClubStore();
