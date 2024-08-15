import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import { TextUserInMatch } from "@molecules/matches/TextUserInMatch/TextUserInMatch";
import UserInMatch from "@molecules/matches/UserInMatch";
import { IMatch } from "@schemas/match";
import { IUser } from "@schemas/user";
import React from "react";

interface IUserWrapperProps {
  user: IUser | null;
  userText: string | null;
  index: number;
  match: IMatch;
}

export const UserWrapper: React.FC<IUserWrapperProps> = ({
  index,
  match,
  user,
  userText,
}) => {
  return (
    <>
      {typeof user != "string" && user && (
        <UserInMatch user={user} index={index} match={match} />
      )}

      {typeof user != "string" && !user && !userText && (
        <AddUserInMatch index={index} match={match} />
      )}

      {typeof user == "string" && (
        <TextUserInMatch text={user} index={index} match={match} />
      )}
    </>
  );
};
