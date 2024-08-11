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
} from "@dal/clubs/club";
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
  async setClubs(clubs: Array<IClub>) {
    this.clubs = clubs;
  }
  async getClubs() {
    const data = await getClubs();
    this.setClubs(data);
  }
  async setBookMarkedClubs(clubs: Array<IClub>) {
    this.bookmarkedClubs = clubs;
  }
  async getBookedClubs() {
    const data = await getClubsByBookmark();
    this.setBookMarkedClubs(data);
  }
  async setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
  loadClubs() {
    this.isLoading = true;
    runInAction(async () => {
      try {
        await this.getClubs();
        await this.getBookedClubs();
      } finally {
        this.setIsLoading(false);
      }
    });
  }
  async setIsLoadingGallery(isLoading: boolean) {
    this.isLoadingGallery = isLoading;
  }
  async loadClubPhotos(clubId: number) {
    this.setIsLoadingGallery(true);
    runInAction(async () => {
      try {
        const data = await loadClubPhoto(clubId);
        this.setPhoto(data);
      } finally {
        this.setIsLoadingGallery(false);
      }
    });
  }
  async setBookmark(clubId: number, isBookmark: boolean) {
    this.bookmarks.set(clubId, isBookmark);
  }
  async getIsBookmark(clubId: number) {
    const isBookmark = await getIsClubBookmarked(clubId);
    this.setBookmark(clubId, isBookmark);
  }
  async addBookmark(clubId: number) {
    await addClubInUserBookmarks(clubId);
    this.setBookmark(clubId, true);

    this.getBookedClubs();
  }
  async removeBookmark(clubId: number) {
    await removeClubFromUserBookmark(clubId);
    this.setBookmark(clubId, false);

    this.getBookedClubs();
  }
  async setIsLoadingOpenedClub(isLoadingOpenedClub: boolean) {
    this.isLoadingOpenedClub = isLoadingOpenedClub;
  }
  async setOpenedClub(club: IClub | null) {
    this.openedClub = club;
  }
  async openClub(clubId: string) {
    this.isLoadingOpenedClub = true;
    runInAction(async () => {
      try {
        const data = await getClubById(clubId);
        this.setOpenedClub(data);
      } finally {
        this.setIsLoadingOpenedClub(false);
      }
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
  async setIsFilterAwait(isFilterAwait: boolean) {
    this.isFilterAwait = isFilterAwait;
  }
  async setPhoto(photo: IClubPhoto[]) {
    this.clubPhotos = photo;
  }
}

export default new ClubStore();
