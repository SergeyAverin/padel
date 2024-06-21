export interface IComment {
  comment: string;
  owner_id: string;
  parent_comment_id: string | undefined;
  story_id: string;
  object_id: string;
  create_time: string;
}
