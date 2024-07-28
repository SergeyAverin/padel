import React, { useEffect, useReducer, useState } from "react";
import Select from "@atoms/Select";

import AddUserInMatchPanel from "../AddUserInMatchPanel";
import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import { IUser } from "@schemas/user";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import MatchStore from "@store/match";
import UserInMatch from "@molecules/matches/UserInMatch";
import AuthStore from "@store/auth";
import SelectScore from "@molecules/matches/SelectScore";
import { Link } from "react-router-dom";
import ChangeLvl from "@molecules/matches/ChangeLvl";
import { shortenString } from "@utils/shoringString";
import AddUserInMatchLocal from "@store/addUserInMatchLocal";
import { observer, useLocalStore } from "mobx-react-lite";

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
      <AddUserInMatchPanel matchId={match.id} />
      <div className="flex justify-between">
        <div className="font-light text-[14px]">
          {new Date(match.start_at).getDate()}
          {"."}
          {new Date(match.start_at).getMonth() + 1}
          {"."}
          {new Date(match.start_at).getFullYear()}
          <br />
          {new Date(match.start_at).getHours()}
          {":"}
          {new Date(match.start_at).getMinutes()}
          {"-"}
          {new Date(match.end_at).getHours()}
          {":"}
          {new Date(match.end_at).getMinutes()}
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
                  // { value: MatchStatusEnum.PLAYED, label: "Played" },
                ]}
              />
            </div>
          ) : (
            <div>{match.status}</div>
          )}
        </div>
      </div>
      <div className="font-light text-[14px] mt-3">
        <Link to={`/clubs/${match.club?.id}`} className="text-highlight">
          Club: {shortenString(match.club?.name, 30)}
        </Link>
      </div>
      <div className="mt-2">
        <div className="font-light text-[14px]">
          Address: {shortenString(match.club?.address, 40)}
        </div>
      </div>
      {/* Users in match  */}
      <div className="flex mt-5 justify-around items-start">
        <div className="w-[50%]">
          <UserInMatchWrapper user={match.user_1} index={1} match={match} />
          <div className="mt-5">
            <UserInMatchWrapper user={match.user_2} index={2} match={match} />
          </div>
        </div>

        <div className="w-[1px] h-[120px] bg-fg"></div>
        <div className="w-[50%] ml-2">
          <UserInMatchWrapper user={match.user_3} index={3} match={match} />
          <div className="mt-5">
            <UserInMatchWrapper user={match.user_4} index={4} match={match} />
          </div>
        </div>
      </div>
      <div>
        {match.owner?.id == AuthStore.authUser?.id &&
          selectedOption.value == MatchStatusEnum.DONE && (
            <>
              <hr className="" />
              <div className="flex justify-between items-center">
                <div className="w-[48%] flex justify-end">
                  <div className="w-[70px] mt-3 mr-2">
                    <SelectScore
                      team={1}
                      defaultScore={match.first_team_score}
                      matchId={match.id}
                    />
                  </div>
                </div>
                <div className="w-[1px] h-[60px] bg-fg"></div>

                <div className="w-[50%] ">
                  <div className="w-[70px] mt-3 ml-2">
                    <SelectScore
                      team={2}
                      defaultScore={match.second_team_score}
                      matchId={match.id}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        {match.owner?.id != AuthStore.authUser?.id &&
          selectedOption.value == MatchStatusEnum.DONE && (
            <>
              <hr />
              <div className="flex justify-between items-center">
                <div className="w-[48%] flex justify-end">
                  <div className="w-[70px] mt-3 mr-2">
                    <div className="text-[24px]  text-end">
                      {match.first_team_score}
                    </div>
                  </div>
                </div>
                <div className="w-[1px] h-[60px] bg-fg"></div>

                <div className="w-[50%] ">
                  <div className="w-[70px] mt-3 ml-2">
                    <div className="text-[24px]">{match.second_team_score}</div>
                  </div>
                </div>
              </div>
              {/* <ChangeLvl matchId={match.id} /> */}
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

const UserInMatchWrapper: React.FC<IUserInMatchWrapperProps> = observer(
  ({ user, index, match }) => {
    const userStore = useLocalStore(() => new AddUserInMatchLocal());
    useEffect(() => {
      userStore.setUser(user);
    }, [user]);
    return (
      <>
        {userStore.user ? (
          <UserInMatch
            userStore={userStore}
            user={userStore.user}
            index={index}
            match={match}
          />
        ) : (
          <AddUserInMatch index={index} match={match} userStore={userStore} />
        )}
      </>
    );
  }
);
