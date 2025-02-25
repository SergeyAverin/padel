import React from "react";
import WhatsAppIcon from "@assets/WhatsAppIcon.svg?react";
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
  let count = 0;
  if (!math.user_1) {
    count += 1;
  }
  if (!math.user_2) {
    count += 1;
  }
  if (!math.user_3) {
    count += 1;
  }
  if (!math.user_4) {
    count += 1;
  }
  const text = `📅 ${new Date(math.start_at).getDate()}
${monthNames[new Date(math.start_at).getMonth()]}
${" "}${new Date(math.start_at).getFullYear()}
${"%0A🕛 "}
${new Date(math.end_at).getHours()}.${String(
    new Date(math.end_at).getMinutes()
  ).padStart(2, "0")}-${new Date(math.start_at).getHours()}.${String(
    new Date(math.start_at).getMinutes()
  ).padStart(2, "0")}
%0A
${"📍 "}
${math.club.name}
%0A
📈 ${math.match_lvl}
%0A
%0A
${count}  players needed%0A
${math.gender ? math.gender : "mixt"}`;
  const url = `https://api.whatsapp.com/send?text=${text}%0A%0A ${API_WEBAPP_LINK}?startapp=open_match_${math.id}`;
  return (
    <div className="flex justify-end  mt-5">
      <a target="_blank" href={url}>
        <div className="flex items-center">
          <WhatsAppIcon />
          Repost
        </div>
      </a>
    </div>
  );
};
