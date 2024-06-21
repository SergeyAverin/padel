export interface IBubble {
  access_code: string;
  name: string;
  owner: string;
  object_id: string;
  comment_allowed: boolean;
  anonim_comment_allowed: boolean;
  have_password: boolean;
  emoji_preset: number;
  all_user_can_create_story: boolean;
  password: string | undefined;
  is_accept: boolean;
  chats: {
    chat_id: string;
    chat_name: string;
    chat_url: string;
  } | null;
}
