import React from "react";
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
  const setBookmark = () => {
    if (data && data.is_bookmark) {
      deleteBookmark(clubId);
    } else {
      addBookmark(clubId);
    }
  };

  return (
    <div onClick={setBookmark}>
      {data && data.is_bookmark ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
    </div>
  );
});
