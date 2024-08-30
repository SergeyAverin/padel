import React, { useEffect, useState } from "react";
import classNames from "classnames";

import style from "./Select.module.css";

import { Option } from "./selectOption";
import { useCloseOnClickOutItem } from "./hooks/useCloseOnClickOutItem";

import ArrowIcon from "@assets/ArrowIcon.svg?react";

interface ISelectProps {
  options?: Array<Option>;
  defaultValue?: Option | null;
  onChange?: (option: Option) => void | null;
  placeholder?: string;
  isLoading?: boolean;
  haveSearch?: boolean;
}

export const Select: React.FC<ISelectProps> = ({
  defaultValue = null,
  onChange = null,
  options = [],
  isLoading = false,
  placeholder = "Select item",
  haveSearch = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);
  const onItemClick = (item: Option) => {
    setSelected(item);
    if (onChange) {
      onChange(item);
      setSearch(item.label);
    }
    setIsOpen(false);
    if (seratchRef.current) {
      seratchRef.current.blur();
    }
  };
  const seratchRef = React.useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    if (seratchRef.current) {
      seratchRef.current.focus();
    }
  };
  const ref = useCloseOnClickOutItem(setIsOpen);
  const [search, setSearch] = useState(selected?.label);
  const [localOption, setLocalOptions] = useState(options);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filtered = options.filter((i) => {
      if (i.label.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setLocalOptions(filtered);
  };
  useEffect(() => {
    setLocalOptions(options);
  }, [options]);
  useEffect(() => {
    setSearch(defaultValue?.label);
  }, [defaultValue]);
  return (
    <div className="relative" ref={ref} onClick={handleFocus}>
      <div
        onClick={() => {
          if (!isLoading) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={classNames(
          "p-2 pl-3 cursor-pointer select-none  rounded-xl",
          " flex justify-between items-center",
          {
            "border-2 border-grey": !isOpen,
            "border-2 border-highlight outline-highlight": isOpen,
          }
        )}
      >
        <div className="pr-2 ">
          {!haveSearch && <>{selected ? selected.label : placeholder}</>}
          {haveSearch && (
            <input
              className="bg-primary w-full text-fg border-none outline-none"
              onChange={onChangeSearch}
              value={search}
              ref={seratchRef}
            />
          )}
        </div>
        <div className="flex items-center ">
          {isLoading && <div className={style.spinner}>Loading&#8230;</div>}
          <div className={classNames("pl-2 border-l-2 border-grey")}>
            <div
              className={classNames("transition", {
                "rotate-[0deg]": isOpen,
                "rotate-[-90deg]": !isOpen,
              })}
            >
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={classNames(
            "w-full border-2 border-highlight shadow-md max-h-[250px] overflow-y-auto",
            "pt-5 pb-5",
            "z-30 bg-primary rounded-xl",
            "absolute top-[110%]",
            "cursor-pointer select-none "
          )}
        >
          {localOption.length == 0 && <div className="pl-3">Empty</div>}
          {localOption.map((item) => (
            <div className="hover:bg-secondary" key={item.value}>
              <div onClick={() => onItemClick(item)} className=" p-1 pl-3 ">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
