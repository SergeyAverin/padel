import { IMatch } from "./match";
import { IUser } from "./user";

export interface IJoinRequest {
  join_request_match: IMatch;
  join_request_user: IUser;
  index: number;
  id: number;
}

export interface ICreateJoinRequest {
  join_request_match: number;
  join_request_user_tg: string;
  index: number;
}
