import React from "react";

import PadelInfo from "@organisms/user/PadelInfo";
import UserInfo from "@organisms/user/UserInfo";
import UserStats from "@organisms/user/UserStats";
import { IUser } from "@schemas/user";

interface IUserTemplateProps {
  user: IUser;
}

export const UserTemplate: React.FC<IUserTemplateProps> = ({ user }) => {
  return (
    <>
      <UserInfo user={user} />

      <div className="mt-3">
        <PadelInfo user={user} />
      </div>

      <div className="mt-3">
        <UserStats />
      </div>
      <div>Matches</div>
    </>
  );
};
