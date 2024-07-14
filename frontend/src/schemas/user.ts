export interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  avatar: string;
  age: number;
  email: string;
  telegram_user_id: string;
  hand: Hand;
  position: Position;
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
