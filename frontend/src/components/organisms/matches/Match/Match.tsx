import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

import AddUserInMatchPanel from "../AddUserInMatchPanel";
import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import { IUser } from "@schemas/user";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import MatchStore from "@store/match";
import UserInMatch from "@molecules/matches/UserInMatch";

interface Option {
  value: string;
  label: string;
}
interface IMatchProps {
  match: IMatch;
}
export const Match: React.FC<IMatchProps> = ({ match }) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option>>(null);

  const handleChange = (option: SingleValue<Option>) => {
    if (option) {
      MatchStore.changeMatchStatus(2, option.value);
    }
    setSelectedOption(option);
  };

  return (
    <div className="bg-primary p-5 rounded-2xl">
      <AddUserInMatchPanel />
      <div className="flex justify-between">
        <div className="font-light text-[14px]">
          Friday 30 May | 10:00h {match.id}
        </div>
        <div className="font-light text-[14px]">
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
        </div>
      </div>
      <div className="mt-2">
        <div className="font-light text-[14px]">Club name address</div>
      </div>

      {/* Users in match  */}
      <div className="flex mt-5 justify-around items-center">
        <UserInMatchWrapper user={match.user_1} index={1} match={match} />
        <UserInMatchWrapper user={match.user_2} index={2} match={match} />

        <div className="w-[1px] h-[120px] bg-fg"></div>

        <UserInMatchWrapper user={match.user_3} index={3} match={match} />
        <UserInMatchWrapper user={match.user_4} index={4} match={match} />
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
