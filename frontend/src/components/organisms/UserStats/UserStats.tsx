import Stat from "@molecules/Stat";
import React from "react";

export const UserStats: React.FC = () => {
  return (
    <div className="bg-primary p-5 rounded-md flex justify-around items-start">
      <Stat count={0} text="Friends" />
      <Stat count={0} text="Match" />
      <Stat count={0} text="Clubs" />
    </div>
  );
};
