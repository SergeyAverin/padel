import { IUser } from "./user";

export interface IFriendRequest {
  id: number;
  sender_user: IUser;
  recipient_user: IUser;
}
