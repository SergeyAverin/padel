import { makeAutoObservable, runInAction } from "mobx";

import {
  getClubs,
  getClubsByBookmark,
  getIsClubBookmarked,
  addClubInUserBookmarks,
  removeClubFromUserBookmark,
  getClubById,
  createClub,
  deleteClub,
  updateClub,
  loadClubPhoto,
  deletePhoto,
  uploadPhoto,
} from "@dal/club";
import { IClub, IClubPhoto, ICreateClub } from "@schemas/club";

class ClubStore {
  isLoading = false;
  clubs: Array<IClub> = [];
  bookmarkedClubs: Array<IClub> = [];
  bookmarks: Map<number, boolean> = new Map();
  openedClub: IClub | null = null;
  isLoadingOpenedClub: boolean = true;
  clubPhotos: Array<IClubPhoto> = [];

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
  async loadClubPhotos(clubId: number) {
    this.clubPhotos = await loadClubPhoto(clubId);
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
  async openClub(clubId: string) {
    this.isLoadingOpenedClub = true;
    runInAction(async () => {
      this.openedClub = await getClubById(clubId);
      this.isLoadingOpenedClub = false;
    });
  }
  async createClub(createClubData: ICreateClub) {
    const newClub = await createClub(createClubData);
    this.bookmarkedClubs.push(newClub);
    return newClub.id;
  }
  async deleteClub(clubId: number) {
    await deleteClub(clubId);
  }
  async updateClub(clubId: number, data: ICreateClub) {
    await updateClub(clubId, data);
    await this.openClub(String(clubId));
  }
  async deletePhoto(clubId: number, photoId: number) {
    await deletePhoto(clubId, photoId);
    await this.loadClubPhotos(clubId);
  }
  async uploadPhoto(clubId: number, photo: FormData) {
    await uploadPhoto(clubId, photo);
    await this.loadClubPhotos(clubId);
  }
}

export default new ClubStore();
