import React from "react";

interface IStat {
  count: number;
  text: string;
}

export const Stat: React.FC<IStat> = ({ count, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[36px] font-bold">{count}</div>
      <div className="text-[16px] font-medium">{text}</div>
    </div>
  );
};
