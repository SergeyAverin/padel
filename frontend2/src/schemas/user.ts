export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  avatar: string;
  age: number;
  email: string;
  telegram_user_id: string;
  hand: Hand;
  position: Position;
  country: string;
  city: string;
  status: string;
  lvl: number;
  is_first_open: boolean;
  gender: Gender;
}

export interface IUserStats {
  clubs_count: number;
  matches_count: number;
  friends_count: number;
}

export interface IUpdateUserData {
  first_name: string;
  last_name: string;
  username: string;
  age: number;
  email: string;
  country: string;
  city: string;
  gender: Gender;
}

export enum Hand {
  LEFT_HAND = "left_hand",
  RIGHT_HAND = "right_hand",
}

export enum Position {
  LEFT = "left",
  RIGHT = "right",
  BOTH = "both",
}

export enum Gender {
  MAN = "man",
  WOMAN = "woman",
  ANY = "ANY",
}
