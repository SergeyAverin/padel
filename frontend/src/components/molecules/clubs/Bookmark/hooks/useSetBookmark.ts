import ClubStore from "@store/clubs/club";

export const useSetBookmark = (clubId: number) => {
  const addBookmark = () => {
    ClubStore.addBookmark(clubId);
  };
  const removeBookmark = () => {
    ClubStore.removeBookmark(clubId);
  };
  return () => {
    if (ClubStore.bookmarks.get(clubId)) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };
};
