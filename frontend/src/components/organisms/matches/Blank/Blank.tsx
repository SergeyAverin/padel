import { Button, ButtonVariant, Heading, HeadingVariant } from "@atoms/index";
import SelectUserLvl from "@molecules/matches/SelectUserLvl";
import { IMatch } from "@schemas/match";
import Match from "@organisms/matches/Match";
import React from "react";

interface IBlankProps {
  match: IMatch;
}

export const Blank: React.FC<IBlankProps> = ({ match }) => {
  return (
    <div className="p-5">
      <div>
        <Match match={match} />
      </div>
      <SelectUserLvl title="User 1" />
      <div className="mt-3">
        <SelectUserLvl title="User 2" />
      </div>
      <div className="mt-3">
        <SelectUserLvl title="User 3" />
      </div>
      <div className="mt-3">
        <SelectUserLvl title="User 4" />
      </div>
      <div className="mt-5">
        <Button variant={ButtonVariant.FULL_HIGHLIGHT}>Submit</Button>
      </div>
      <hr className="mt-5 mb-5" />
    </div>
  );
};
