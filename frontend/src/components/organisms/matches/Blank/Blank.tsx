import { Button, ButtonVariant } from "@atoms/index";
import SelectUserLvl from "@molecules/matches/SelectUserLvl";
import { IMatch } from "@schemas/match";
// import Match from "@organisms/matches/Match";
import React, { useState } from "react";
import BlankStore from "@store/matches/blank";

interface IBlankProps {
  match: IMatch;
}

export const Blank: React.FC<IBlankProps> = ({ match }) => {
  const [user1, setUser1] = useState({ label: "1", value: "1" });
  const [user2, setUser2] = useState({ label: "1", value: "1" });
  const [user3, setUser3] = useState({ label: "1", value: "1" });
  const [user4, setUser4] = useState({ label: "1", value: "1" });
  const onSubmit = () => {
    BlankStore.createBlank(
      match.id,
      Number(user1.value),
      Number(user2.value),
      Number(user3.value),
      Number(user4.value)
    );
  };
  return (
    <div className="p-5">
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
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT} onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <hr className="mt-5 mb-5" />
    </div>
  );
};
