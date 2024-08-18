import { useEffect, useRef } from "react";

export const useCloseOnClickOutItem = (
  setIsOpen: (isOpen: boolean) => void
) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  return ref;
};
