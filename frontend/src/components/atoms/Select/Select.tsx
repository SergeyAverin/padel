import React, { useState } from "react";

import style from "./Select.module.sass";

export const Select: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("item");
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen((prev) => !prev);
    console.log(e.target);
  };
  return (
    <div className={style.selectMenuWrapper}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={isOpen ? style.selectMenu : style.selectMenuOpen}
      >
        item
      </div>
      {isOpen && (
        <div className={style.selectDropDownMenu} onClick={onClick}>
          <div className={style.item} data-value="item">
            Item
          </div>
          <div className={style.item} data-value="item">
            Item
          </div>
          <div className={style.item} data-value="item">
            Item
          </div>
        </div>
      )}
    </div>
  );
};
