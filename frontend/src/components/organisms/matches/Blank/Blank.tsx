import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import SelectUserLvl from "@molecules/matches/SelectUserLvl";
import { IMatch } from "@schemas/match";
import Match from "@organisms/matches/Match";
import React, { useState } from "react";
import BlankStore from "@store/blank";

interface IBlankProps {
  match: IMatch;
}

export const Blank: React.FC<IBlankProps> = ({ match }) => {
  const [user1, setUser1] = useState(1);
  const [user2, setUser2] = useState(1);
  const [user3, setUser3] = useState(1);
  const [user4, setUser4] = useState(1);
  const onSubmit = () => {
    BlankStore.createBlank(match.id, user1, user2, user3, user4);
  };
  return (
    <div className="p-5">
      <div>
        <Match match={match} />
      </div>
      <SelectUserLvl
        title="User 1"
        onChange={(option) => setUser1(Number(option.value))}
      />
      <div className="mt-3">
        <SelectUserLvl
          title="User 2"
          onChange={(option) => setUser2(Number(option.value))}
        />
      </div>
      <div className="mt-3">
        <SelectUserLvl
          title="User 3"
          onChange={(option) => setUser3(Number(option.value))}
        />
      </div>
      <div className="mt-3">
        <SelectUserLvl
          title="User 4"
          onChange={(option) => setUser4(Number(option.value))}
        />
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
