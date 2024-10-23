import { IMatch } from "@schemas/match";
import { shortenString } from "@utils/shoringString";
import React from "react";
import { Link } from "react-router-dom";
import MatchInfo from "../MatchInfo";
import {
  useCancelMatchRequestByUserMutation,
  useGetMatchRequestByUserQuery,
} from "@redux/api/userMatchRequestApi";
import { Button, ButtonVariant } from "@atoms/index";

interface IMatchLinksProps {
  match: IMatch;
}

export const MatchLinks: React.FC<IMatchLinksProps> = ({ match }) => {
  const { data, isLoading } = useGetMatchRequestByUserQuery(match.id);
  const [cancelRequest] = useCancelMatchRequestByUserMutation();
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

          {/* Send request info */}
          {!isLoading && data && (
            <div className="mt-2">
              <div className="font-light text-[14px] flex items-center">
                <div className="">
                  You have sent a request to enter the match:
                </div>
              </div>
              <div className="mt-2">
                <Button
                  variant={ButtonVariant.FULL_HIGHLIGHT}
                  onClick={() => cancelRequest(match.id)}
                >
                  Cancel join request
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
