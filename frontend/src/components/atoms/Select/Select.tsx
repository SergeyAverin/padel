import React, { useState } from "react";
import classNames from "classnames";

import ArrowIcon from "@assets/ArrowIcon.svg?react";

interface Option {
  value: string;
  label: string;
}
interface ISelectProps {
  options?: Array<Option>;
  defaultValue?: Option | null;
  onChange?: (option: Option) => void | null;
  placeholder?: string;
}

export const Select: React.FC<ISelectProps> = ({
  defaultValue = null,
  onChange = null,
  options = [],
  placeholder = "Select item",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const onItemClick = (item: Option) => {
    setSelected(item);
    if (onChange) {
      onChange(item);
    }
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={classNames(
          "p-2 pl-3 cursor-pointer select-none  rounded-xl",
          " flex justify-between items-center",
          {
            "border-2 border-grey": !isOpen,
            "border-2 border-highlight outline-highlight": isOpen,
          }
        )}
      >
        <div className="pr-2 ">{selected ? selected.label : placeholder}</div>
        <div className="flex items-center ">
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
          {options.map((item) => (
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
