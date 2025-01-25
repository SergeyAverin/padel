import React from "react";
import RepostIcon from "@assets/RepostIcon.svg?react";

const API_WEBAPP_LINK = import.meta.env.VITE_API_WEBAPP_LINK;

interface IRepostButtonProps {
  mathId: number;
}

export const RepostButton: React.FC<IRepostButtonProps> = ({ mathId }) => {
  return (
    <div className="flex justify-end  mt-5">
      <a
        target="_blank"
        href={`https://api.whatsapp.com/send?text=${API_WEBAPP_LINK}?startapp=open_match_${mathId}`}
      >
        <div className="flex items-center">
          <RepostIcon />
          Repost
        </div>
      </a>
    </div>
  );
};
