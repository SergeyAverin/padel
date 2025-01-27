import React from "react";
import RepostIcon from "@assets/RepostIcon.svg?react";
import { IMatch } from "@schemas/match";

const API_WEBAPP_LINK = import.meta.env.VITE_API_WEBAPP_LINK;

interface IRepostButtonProps {
  math: IMatch;
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
export const RepostButton: React.FC<IRepostButtonProps> = ({ math }) => {
  const text = `
2  players needed
Date: ${new Date(math.start_at).getDate()}{" "}
${monthNames[new Date(math.start_at).getMonth()]}{" "}
${new Date(math.start_at).getFullYear()}

${new Date(math.end_at).getHours()}:${String(
    new Date(math.end_at).getMinutes()
  ).padStart(2, "0")}-${new Date(math.start_at).getHours()}:${String(
    new Date(math.start_at).getMinutes()
  ).padStart(2, "0")}
Level: ${math.match_lvl}
Type: ${math.gender}
https://api.whatsapp.com/send?text=I invite you to a padel match\n ${API_WEBAPP_LINK}?startapp=open_match_${
    math.id
  }`;
  return (
    <div className="flex justify-end  mt-5">
      <a target="_blank" href={text}>
        <div className="flex items-center">
          <RepostIcon />
          Repost
        </div>
      </a>
    </div>
  );
};
