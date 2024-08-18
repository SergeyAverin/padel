import { useEffect } from "react";

export const useInfinityScroll = <T>(
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  data: { items: Array<T> } | undefined,
  isFetching: boolean
) => {
  const arr = data?.items ?? [];

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);
  return arr;
};
