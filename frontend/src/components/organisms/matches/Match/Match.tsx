import Select, { SingleValue } from "react-select";
import UserInMatch from "@molecules/matches/UserInMatch";
import { IUser } from "@schemas/user";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import MatchStore from "@store/match";
import { getHoursInRange } from "@utils/timeUtils";
import AddUserInMatch from "@molecules/matches/AddUserInMatch";
import AddUserInMatchPanel from "../AddUserInMatchPanel";
interface Option {
  value: string;
  label: string;
}
interface IMatchProps {
  match: IMatch;
}
export const Match: React.FC<IMatchProps> = ({ match }) => {
  const user1: IUser = {
    age: 12,
    avatar: "",
    email: "sdf",
    first_name: "safd",
    hand: "left_hand",
    last_name: "sdf",
    position: "left",
    telegram_user_id: "23",
    usernam: "sdf",
  };
  const user2: IUser = {
    age: 43,
    avatar: "",
    email: "sdf",
    first_name: "safd",
    hand: "left_hand",
    last_name: "sdf",
    position: "left",
    telegram_user_id: "23",
    usernam: "sdf",
  };
  const user3: IUser = {
    age: 56,
    avatar: "",
    email: "sdf",
    first_name: "safd",
    hand: "left_hand",
    last_name: "sdf",
    position: "left",
    telegram_user_id: "23",
    usernam: "sdf",
  };
  const user4: IUser = {
    age: 3,
    avatar: "",
    email: "sdf",
    first_name: "safd",
    hand: "left_hand",
    last_name: "sdf",
    position: "left",
    telegram_user_id: "23",
    usernam: "sdf",
  };
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
      <div className="flex mt-5 justify-around items-center">
        {match.user_1 ? (
          <UserInMatchWrapper user={match.user_1} index={1} />
        ) : (
          <AddUserInMatch index={1} match={match} />
        )}
        {match.user_2 ? (
          <UserInMatchWrapper user={match.user_2} index={2} />
        ) : (
          <AddUserInMatch index={2} match={match} />
        )}

        <div className="w-[1px] h-[120px] bg-fg"></div>

        {match.user_3 ? (
          <UserInMatchWrapper user={match.user_3} index={3} />
        ) : (
          <AddUserInMatch index={3} match={match} />
        )}
        {/* <UserInMatchWrapper user={user4} /> */}
        {match.user_4 ? (
          <UserInMatchWrapper user={match.user_4} index={4} />
        ) : (
          <AddUserInMatch index={4} match={match} />
        )}
      </div>
    </div>
  );
};

interface IUserInMatchWrapperProps {
  user: IUser;
  index: number;
}

const UserInMatchWrapper: React.FC<IUserInMatchWrapperProps> = ({
  user,
  index,
}) => {
  const x = 0;
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "UserInMatch",
      drop: () => alert(x),
    }),
    [x]
  );
  return (
    <div ref={drop}>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
      <UserInMatch
        index={index}
        user={user}
        match={{
          club_id: 1,
          created_at: new Date(),
          end_at: new Date(),
          id: 2,
          owner_id: 1,
          start_at: new Date(),
          status: "done",
        }}
      />
    </div>
  );
};
