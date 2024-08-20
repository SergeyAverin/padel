import { Button, ButtonVariant } from "@atoms/index";
import SelectUserLvl from "@molecules/matches/SelectUserLvl";
// import { useCreateBlankMutation } from "@redux/api/blankApi";
import { IMatch } from "@schemas/match";
// import Match from "@organisms/matches/Match";
import React, { useState } from "react";
import Match from "../Match";

interface IBlankProps {
  match: IMatch;
  navigate: React.ReactNode;
  setNext: () => void;
  close: () => void;
}

export const Blank: React.FC<IBlankProps> = ({
  match,
  navigate,
  setNext,
  close,
}) => {
  const [user1, setUser1] = useState({ label: "1", value: "1" });
  const [user2, setUser2] = useState({ label: "1", value: "1" });
  const [user3, setUser3] = useState({ label: "1", value: "1" });
  const [user4, setUser4] = useState({ label: "1", value: "1" });
  // const [createBlank] = useCreateBlankMutation();
  const onSubmit = () => {
    // createBlank({
    //   matchId: match.id,
    //   user_1: Number(user1.value),
    //   user_2: Number(user2.value),
    //   user_3: Number(user3.value),
    //   user_4: Number(user4.value),
    // });
    setNext();
  };
  const [showMatch, setShowMatch] = useState(false);
  const toggleMatch = () => {
    setShowMatch((prev) => !prev);
  };
  return (
    <div className="p-5 flex flex-col justify-between h-[400px]">
      <div>
        <div className="grid grid-cols-2 gap-4">
          {match.user_1 && (
            <div>
              <SelectUserLvl
                value={user1}
                title={match.user_1.username}
                onChange={(option) => setUser1(option)}
              />
            </div>
          )}
          {match.user_2 && (
            <div>
              <SelectUserLvl
                value={user2}
                title={match.user_2.username}
                onChange={(option) => setUser2(option)}
              />
            </div>
          )}
          {match.user_3 && (
            <div>
              <SelectUserLvl
                value={user3}
                title={match.user_3.username}
                onChange={(option) => setUser3(option)}
              />
            </div>
          )}
          {match.user_4 && (
            <div>
              <SelectUserLvl
                title={match.user_4.username}
                value={user4}
                onChange={(option) => setUser4(option)}
              />
            </div>
          )}
        </div>
        <div>
          {!showMatch && (
            <>
              <div className="text-[16px] text-highlight" onClick={toggleMatch}>
                Show match
              </div>
              <Match match={match} />
            </>
          )}
          {showMatch && (
            <div className="text-[16px] text-highlight" onClick={toggleMatch}>
              Close match
            </div>
          )}
        </div>
      </div>
      <div>
        {navigate}
        <div className="mt-5">
          <Button variant={ButtonVariant.FULL_HIGHLIGHT} onClick={onSubmit}>
            Submit
          </Button>
        </div>
        <div className="mt-1">
          <Button onClick={close}>Close</Button>
        </div>
      </div>
    </div>
  );
};
