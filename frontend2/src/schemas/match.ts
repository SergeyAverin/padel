import { IClub } from "./club";
import { IUser } from "./user";

export interface IMatch {
  owner: IUser | null;
  created_at: Date;
  id: number;
  club_id: number;
  selected_court_id: number;
  start_at: Date;
  club: IClub | null;
  status: string;
  end_at: Date;
  user_1: IUser | null;
  user_2: IUser | null;
  user_3: IUser | null;
  user_4: IUser | null;
  text_user_1: string | null;
  text_user_2: string | null;
  text_user_3: string | null;
  text_user_4: string | null;

  first_team_score: number;
  second_team_score: number;
  match_lvl: string;
}

export enum MatchStatusEnum {
  EXPECTATION = "expectation",
  PLAYED = "played",
  DONE = "done",
}