import { makeAutoObservable, runInAction } from "mobx";

import {
  getMatchByClubId,
  getMatchByUserId,
  getMatchesFromUserFriends,
  getMatchesFromBookmarkedClubs,
  changeStatus,
  changeScore,
} from "@dal/matches/match";
import { IMatch } from "@schemas/match";
import AuthStore from "@store/account/auth";

class MatchStore {
  isLoading = true;
  isLoadingFromClub = true;
  matches: Array<IMatch> = [];
  matchesFromFriends: Array<IMatch> = [];
  matchesFromBookmarks: Array<IMatch> = [];

  constructor() {
    makeAutoObservable(this);
  }
  async loadUserMatches(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.matches = await getMatchByUserId(userId);
      this.isLoading = false;
    });
  }
  async changeMatchStatus(matchId: number, newStatus: string) {
    await changeStatus(matchId, newStatus);
  }
  async loadClubMatches(clubId: number) {
    this.isLoadingFromClub = true;
    runInAction(async () => {
      this.matches = await getMatchByClubId(clubId);
      this.isLoadingFromClub = false;
    });
  }
  async loadFriendsMatches(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      this.matchesFromFriends = await getMatchesFromUserFriends(userId);
      this.isLoading = false;
    });
  }
  async loadMatchesFromBookmarkedClubs(userId: string) {
    runInAction(async () => {
      this.matchesFromBookmarks = await getMatchesFromBookmarkedClubs(userId);
    });
  }
  async changeScore(matchId: number, team: number, score: number) {
    await changeScore(matchId, team, score);
  }
  async loadingMatch() {
    this.isLoading = true;
    runInAction(async () => {
      if (AuthStore.authUser) {
        await this.loadUserMatches(AuthStore.authUser.telegram_user_id);
        await this.loadFriendsMatches(AuthStore.authUser.telegram_user_id);
        await this.loadMatchesFromBookmarkedClubs(
          AuthStore.authUser.telegram_user_id
        );
      }
    });
    this.isLoading = false;
  }
}

export default new MatchStore();
