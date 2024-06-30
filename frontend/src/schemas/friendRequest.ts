import { IUser } from "./user";

export interface IFriendRequest {
  sender_user_id: IUser;
  recipient_user_id: IUser;
}
