import React from "react";
import RepostIcon from "@assets/RepostIcon.svg?react";

const API_WEBAPP_LINK = import.meta.env.VITE_API_WEBAPP_LINK;

interface IRepostButtonProps {
  mathId: number;
}

export const RepostButton: React.FC<IRepostButtonProps> = ({ mathId }) => {
  const text = `https://api.whatsapp.com/send?text="I invite you to a padel match\n${API_WEBAPP_LINK}?startapp=open_match_${mathId}"`
  return (
    <div className="flex justify-end  mt-5">
      <a
        target="_blank"
        href={text}
      >
        <div className="flex items-center">
          <RepostIcon />
          Repost
        </div>
      </a>
    </div>
  );
};
