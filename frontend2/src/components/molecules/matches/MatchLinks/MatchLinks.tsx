import { IMatch } from "@schemas/match";
import { shortenString } from "@utils/shoringString";
import React from "react";
import { Link } from "react-router-dom";
import MatchInfo from "../MatchInfo";

interface IMatchLinksProps {
  match: IMatch;
}

export const MatchLinks: React.FC<IMatchLinksProps> = ({ match }) => {
  return (
    <>
      <MatchInfo match={match} />

      {match.club && (
        <>
          <div className="font-light text-[14px] mt-3">
            <Link to={`/clubs/${match.club?.id}`} className="text-highlight">
              Club: {shortenString(match.club.name, 30)}
            </Link>
          </div>
          <div className="mt-2">
            <div className="font-light text-[14px]">
              Address: {shortenString(match.club.address, 40)}
            </div>
          </div>
          <div className="mt-2">
            <div className="font-light text-[14px] flex items-center">
              Game lvl:
              <div className="p-1 rounded-full ml-2 font-bold text-[14px] bg-highlight text-center w-[60px] text-bg">
                {match.match_lvl}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="font-light text-[14px] flex items-center">
              Gender:
              <div className="ml-2">{match.gender}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
