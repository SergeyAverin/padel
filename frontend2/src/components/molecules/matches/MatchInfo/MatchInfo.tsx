import { IMatch } from "@schemas/match";
import React from "react";

interface IMatchInfoProps {
  match: IMatch;
}
const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MatchInfo: React.FC<IMatchInfoProps> = ({ match }) => {
  return (
    <>
      <div className="font-light text-[14px]">
        {new Date(match.start_at).getDate()}{" "}
        {monthNames[new Date(match.start_at).getMonth()]}{" "}
        {new Date(match.start_at).getFullYear()}
        <br />
        <span className="font-bold text-[14px]">
          {new Date(match.end_at).getHours()}
          {":"}
          {String(new Date(match.end_at).getMinutes()).padStart(2, "0")}
          {"-"}
          {new Date(match.start_at).getHours()}
          {":"}
          {String(new Date(match.start_at).getMinutes()).padStart(2, "0")}
        </span>
      </div>
    </>
  );
};
