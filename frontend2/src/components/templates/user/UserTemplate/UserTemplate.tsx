import React from "react";

import PadelInfo from "@organisms/user/PadelInfo";
import UserInfo from "@organisms/user/UserInfo";
import UserStats from "@organisms/user/UserStats";
import { IUser } from "@schemas/user";
import { Heading, HeadingVariant } from "@atoms/index";
import MatchUserTemplate from "@templates/matches/MatchUserTemplate";

interface IUserTemplateProps {
  user: IUser;
  button: React.ReactNode;
}

export const UserTemplate: React.FC<IUserTemplateProps> = ({
  user,
  button,
}) => {
  return (
    <>
      <UserInfo user={user} />

      <div className="mt-3 mb-3 w-[50%] h-[50px]">{button}</div>

      <div className="mt-3">
        <Heading variant={HeadingVariant.H2}>Padel info:</Heading>
        <PadelInfo user={user} />
      </div>

      <div className="mt-3">
        <Heading variant={HeadingVariant.H2}>Stats:</Heading>
        <UserStats userId={user.telegram_user_id} />
      </div>
      <div className="mt-5 mb-[80px]">
        <MatchUserTemplate isMatchPage={false} userId={user.telegram_user_id} />
      </div>
    </>
  );
};
