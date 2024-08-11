import React from "react";
import { observer } from "mobx-react-lite";

import ClubStore from "@store/clubs/club";

import BookmarkOffIcon from "@assets/BookmarkOffIcon.svg?react";
import BookmarkOnIcon from "@assets/BookmarkOnIcon.svg?react";
import { useSetBookmark } from "./hooks/useSetBookmark";

interface IBookmark {
  clubId: number;
}

export const Bookmark: React.FC<IBookmark> = observer(({ clubId }) => {
  const setBookmark = useSetBookmark(clubId);

  return (
    <div onClick={setBookmark}>
      {ClubStore.bookmarks.get(clubId) ? (
        <BookmarkOnIcon />
      ) : (
        <BookmarkOffIcon />
      )}
    </div>
  );
});
