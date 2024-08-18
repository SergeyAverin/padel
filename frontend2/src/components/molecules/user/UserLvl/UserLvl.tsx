import React from "react";
import { observer } from "mobx-react-lite";

interface IUserLvl {
  lvl: number;
}

export const UserLvl: React.FC<IUserLvl> = observer(({ lvl }) => {
  return (
    <div className="p-3 bg-highlight text-bg rounded-full w-[35px] h-[35px] flex justify-center items-center font-bold">
      {lvl}
    </div>
  );
});
