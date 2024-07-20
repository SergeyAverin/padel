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
  uploadAvatar,
} from "@dal/club";
import { IClub, IClubPhoto, ICreateClub } from "@schemas/club";

class ClubStore {
  isLoading = true;
  isLoadingGallery = true;
  clubs: Array<IClub> = [];
  bookmarkedClubs: Array<IClub> = [];
  bookmarks: Map<number, boolean> = new Map();
  openedClub: IClub | null = null;
  isLoadingOpenedClub: boolean = true;
  clubPhotos: Array<IClubPhoto> = [];
  isFilterAwait: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  async getClubs() {
    this.clubs = await getClubs();
  }
  async getBookedClubs() {
    this.bookmarkedClubs = await getClubsByBookmark();
  }
  loadClubs() {
    this.isLoading = true;
    runInAction(async () => {
      await this.getClubs();
      await this.getBookedClubs();
      this.isLoading = false;
    });
  }
  async loadClubPhotos(clubId: number) {
    this.isLoadingGallery = true;
    runInAction(async () => {
      this.clubPhotos = await loadClubPhoto(clubId);
      this.isLoadingGallery = false;
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
    this.clubPhotos = this.clubPhotos.filter((item) => item.id != photoId);
    await deletePhoto(clubId, photoId);
  }
  async uploadPhoto(clubId: number, photo: FormData) {
    await uploadPhoto(clubId, photo);
    await this.loadClubPhotos(clubId);
  }
  async uploadAvatar(clubId: number, photo: FormData) {
    await uploadAvatar(clubId, photo);
    await this.openClub(String(clubId));
  }
}

export default new ClubStore();
