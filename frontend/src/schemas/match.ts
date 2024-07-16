export interface IMatch {
  owner_id: number;
  created_at: Date;
  id: number;
  start_at: Date;
  club_id: number;
  status: string;
  end_at: Date;
}

export enum MatchStatusEnum {
  EXPECTATION = "expectation",
  PLAYED = "played",
  DONE = "done",
}
