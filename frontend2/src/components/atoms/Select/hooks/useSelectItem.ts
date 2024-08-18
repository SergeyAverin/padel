import { useEffect, useState } from "react";

import { Option } from "../selectOption";

export const useSelectItem = (
  defaultValue: Option | null,
  onChange: ((option: Option) => void | null) | null,
  setIsOpen: (isOpen: boolean) => void
) => {
  const [selected, setSelected] = useState<Option | null>(defaultValue);
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);
  const onItemClick = (item: Option) => {
    setSelected(item);
    if (onChange) {
      onChange(item);
    }
    setIsOpen(false);
  };
  return [selected, onItemClick];
};
