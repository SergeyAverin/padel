import UserStats from "@organisms/user/UserStats";
import React from "react";

export const UserTemplate: React.FC = () => {
  return (
    <>
      <UserStats />
      <div>PadelInfo</div>
      <div>UserStats</div>
      <div>Matches</div>
    </>
  );
};
