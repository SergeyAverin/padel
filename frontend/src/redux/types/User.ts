import { IBubble } from "./Bubble";

export interface IUser {
  user_id: string;
  nickname: string;
  subscriptions: IBubble[];
  user_code: string;
  type: string;
  chats: Array<{
    chat_id: string;
    chat_name: string;
  }>;
}
