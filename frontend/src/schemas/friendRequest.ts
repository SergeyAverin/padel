import { IUser } from "./user";

export interface IFriendRequest {
  id: number;
  sender_user_id: IUser;
  recipient_user_id: IUser;
}
