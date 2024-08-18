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
  isReverse?: boolean;
}

export const UserWrapper: React.FC<IUserWrapperProps> = ({
  index,
  match,
  user,
  userText,
  isReverse = false,
}) => {
  return (
    <>
      {typeof user != "string" && user && (
        <UserInMatch
          user={user}
          index={index}
          match={match}
          isReverse={isReverse}
        />
      )}

      {typeof user != "string" && !user && !userText && (
        <AddUserInMatch isReverse={isReverse} index={index} match={match} />
      )}
      {userText && (
        <TextUserInMatch
          isRevers={isReverse}
          text={userText as string}
          index={index}
          match={match}
        />
      )}
    </>
  );
};
