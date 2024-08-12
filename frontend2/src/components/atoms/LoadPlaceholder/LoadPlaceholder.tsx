import React from "react";

import style from "./style.module.css";

export const LoadPlaceholder: React.FC = () => {
  return (
    <div className="rounded-2xl">
      <div className={style.placeholder}>
        <div className={style.animatedBackground}></div>
      </div>
    </div>
  );
};
