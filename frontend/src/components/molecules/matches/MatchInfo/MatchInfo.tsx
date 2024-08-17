import { IMatch } from "@schemas/match";
import React from "react";

interface IMatchInfoProps {
  match: IMatch;
}

export const MatchInfo: React.FC<IMatchInfoProps> = ({ match }) => {
  return (
    <>
      <div className="font-light text-[10px]">
        {new Date(match.start_at).getDate()}
        {"."}
        {new Date(match.start_at).getMonth() + 1}
        {"."}
        {new Date(match.start_at).getFullYear()}
        {" | "}
        {new Date(match.end_at).getHours()}
        {":"}
        {String(new Date(match.end_at).getMinutes()).padStart(2, "0")}
        {"-"}
        {new Date(match.start_at).getHours()}
        {":"}
        {String(new Date(match.start_at).getMinutes()).padStart(2, "0")}
      </div>
    </>
  );
};
