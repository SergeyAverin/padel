import React from "react";

interface IUserLvl {
  lvl: number;
}

export const UserLvl: React.FC<IUserLvl> = ({ lvl }) => {
  return (
    <div className="p-3 bg-highlight text-bg rounded-full w-[35px] h-[35px] flex justify-center items-center font-bold">
      {lvl}
    </div>
  );
};
