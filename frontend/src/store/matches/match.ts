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
  async setMatches(matches: Array<IMatch>) {
    this.matches = matches;
  }
  async setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
  async loadUserMatches(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      try {
        const matches = await getMatchByUserId(userId);
        await this.setMatches(matches);
      } finally {
        this.setIsLoading(false);
      }
    });
  }
  async changeMatchStatus(matchId: number, newStatus: string) {
    await changeStatus(matchId, newStatus);
  }
  async setisLoadingFromClub(isLoading: boolean) {
    this.isLoadingFromClub = isLoading;
  }
  async loadClubMatches(clubId: number) {
    this.isLoadingFromClub = true;
    runInAction(async () => {
      try {
        const data = await getMatchByClubId(clubId);
        this.setMatches(data);
      } finally {
        this.setisLoadingFromClub(false);
      }
    });
  }
  async setMatchesFromFriends(mathces: Array<IMatch>) {
    this.matchesFromFriends = mathces;
  }
  async loadFriendsMatches(userId: string) {
    this.isLoading = true;
    runInAction(async () => {
      const data = await getMatchesFromUserFriends(userId);
      this.setMatchesFromFriends(data);
      this.setIsLoading(false);
    });
  }
  setMatchesFromBookmarks(mathces: Array<IMatch>) {
    this.matchesFromBookmarks = mathces;
  }
  async loadMatchesFromBookmarkedClubs(userId: string) {
    runInAction(async () => {
      const data = await getMatchesFromBookmarkedClubs(userId);
      this.setMatchesFromBookmarks(data);
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
