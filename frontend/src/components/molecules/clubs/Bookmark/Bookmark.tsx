import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import ClubStore from "@store/club";

import BookmarkOffIcon from "@assets/BookmarkOffIcon.svg?react";
import BookmarkOnIcon from "@assets/BookmarkOnIcon.svg?react";

interface IBookmark {
  clubId: number;
}

export const Bookmark: React.FC<IBookmark> = observer(({ clubId }) => {
  useEffect(() => {
    ClubStore.getIsBookmark(clubId);
  }, []);
  return (
    <>
      {ClubStore.bookmarks.get(clubId) ? (
        <BookmarkOnIcon />
      ) : (
        <BookmarkOffIcon />
      )}
    </>
  );
});
