import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import BookmarkOffIcon from "@assets/BookmarkOffIcon.svg?react";
import BookmarkOnIcon from "@assets/BookmarkOnIcon.svg?react";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkStatusQuery,
} from "@redux/api/clubApi";

interface IBookmark {
  clubId: number;
}

export const Bookmark: React.FC<IBookmark> = observer(({ clubId }) => {
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const { data } = useGetBookmarkStatusQuery(clubId);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (data) {
      setIsActive(data.is_bookmark);
    }
  }, [data]);

  const setBookmark = () => {
    if (data && data.is_bookmark) {
      setIsActive(false);
      deleteBookmark(clubId);
    } else {
      setIsActive(true);
      addBookmark(clubId);
    }
  };

  return (
    <div onClick={setBookmark}>
      {isActive ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
    </div>
  );
});
