export interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  age: string;
  email: string;
  telegram_user_id: string;
  hand: Hand;
  position: Position;
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
