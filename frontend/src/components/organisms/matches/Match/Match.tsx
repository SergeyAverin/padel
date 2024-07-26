import React, { useState } from "react";
import Select from "@atoms/Select";

import AddUserInMatchPanel from "../AddUserInMatchPanel";
import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import { IUser } from "@schemas/user";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import MatchStore from "@store/match";
import UserInMatch from "@molecules/matches/UserInMatch";
import AuthStore from "@store/auth";
import SelectScore from "@molecules/matches/SelectScore";

interface Option {
  value: string;
  label: string;
}

interface IMatchProps {
  match: IMatch;
}
export const Match: React.FC<IMatchProps> = ({ match }) => {
  const [selectedOption, setSelectedOption] = useState<Option>({
    value: match.status,
    label: match.status,
  });

  const handleChange = (option: Option) => {
    if (option) {
      MatchStore.changeMatchStatus(match.id, option.value);
    }
    setSelectedOption(option);
  };

  const permission =
    AuthStore.authUser?.id == match.owner?.id ||
    AuthStore.authUser?.id == match.club?.owner_id ||
    AuthStore.authUser?.status == "super_admin";

  return (
    <div className="bg-primary p-5 rounded-2xl">
      #{match.id}
      <AddUserInMatchPanel matchId={match.id} />
      <div className="flex justify-between">
        <div className="font-light text-[14px]">
          {new Date(match.start_at).getDate()}
          {"."}
          {new Date(match.start_at).getMonth() + 1}
          {"."}
          {new Date(match.start_at).getFullYear()}
          {" | "}
          {new Date(match.start_at).getHours()}
          {":"}
          {new Date(match.start_at).getMinutes()}
          {"-"}
          {new Date(match.end_at).getHours()}
          {":"}
          {new Date(match.end_at).getMinutes()}
          {" | "}
          {new Date(match.end_at).getHours() -
            new Date(match.start_at).getHours()}
        </div>
        <div className="font-light text-[14px]">
          {permission ? (
            <div>
              <Select
                defaultValue={selectedOption}
                onChange={handleChange}
                options={[
                  { value: MatchStatusEnum.DONE, label: "Done" },
                  { value: MatchStatusEnum.EXPECTATION, label: "Expectation" },
                  { value: MatchStatusEnum.PLAYED, label: "Played" },
                ]}
              />
            </div>
          ) : (
            <div>{match.status}</div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="font-light text-[14px]">{match.club?.address}</div>
      </div>
      {/* Users in match  */}
      <div className="flex mt-5 justify-around items-start">
        <UserInMatchWrapper user={match.user_1} index={1} match={match} />
        <UserInMatchWrapper user={match.user_2} index={2} match={match} />

        <div className="w-[1px] h-[120px] bg-fg"></div>

        <UserInMatchWrapper user={match.user_3} index={3} match={match} />
        <UserInMatchWrapper user={match.user_4} index={4} match={match} />
      </div>
      <div>
        {match.owner?.id == AuthStore.authUser?.id &&
          match.status == MatchStatusEnum.DONE && (
            <>
              <hr className="mb-3" />
              <div className="mb-3">Match result:</div>
              <div className="flex justify-between items-center">
                <SelectScore matchId={match.id} />
                <SelectScore matchId={match.id} />
              </div>
            </>
          )}
        {match.owner?.id == AuthStore.authUser?.id &&
          match.status == MatchStatusEnum.EXPECTATION && (
            <>
              <hr className="mb-3" />
              <div className="flex justify-between items-center">
                <div className="text-[24px]">{match.first_team_score}</div>
                <div className="text-[24px]">{match.second_team_score}</div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

interface IUserInMatchWrapperProps {
  user: IUser | null;
  index: number;
  match: IMatch;
}

const UserInMatchWrapper: React.FC<IUserInMatchWrapperProps> = ({
  user,
  index,
  match,
}) => {
  return (
    <>
      {user ? (
        <UserInMatch user={user} index={index} match={match} />
      ) : (
        <AddUserInMatch index={index} match={match} />
      )}
    </>
  );
};
