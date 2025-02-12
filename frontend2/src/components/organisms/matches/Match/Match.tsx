import { useAuthUser } from "@hooks/useAuthUser";
import { MatchLinks } from "@molecules/matches/MatchLinks/MatchLinks";
import { MatchScore } from "@molecules/matches/MatchScore/MatchScore";
import { SetMatchScores } from "@molecules/matches/MatchScore/SetMatchScores";
import SetMatchStatus from "@molecules/matches/SetMatchStatus";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import { IUser } from "@schemas/user";
import React from "react";
import { UserWrapper } from "./UserWrapper";
import { useGetMaatchByIdQuery } from "@redux/api/matchApi";
import style from "./style.module.css";
import classNames from "classnames";
import { RepostButton } from "@molecules/RepostButton/RepostButton";

interface IMatchProps {
  match: IMatch;
}

export const Match: React.FC<IMatchProps> = ({ match }) => {
  const user = useAuthUser() as IUser;
  const { data, isLoading, isFetching } = useGetMaatchByIdQuery(match.id);
  const permission =
    user.id == match.owner?.id ||
    user.id == match.club?.owner_id ||
    user.status == "super_admin";
  return (
    <div className="animate-fade-in">
      <div
        className={classNames(
          "bg-primary p-5 rounded-2xl min-h-[400px]",
          `${isLoading && style.animatedBackground}`
        )}
      >
        {/* {match.id} */}
        {!isLoading && data && (
          <>
            <div className="flex justify-between items-start">
              <div>
                <MatchLinks match={data} />
              </div>
              <div className="flex flex-col items-end">
                {permission ? (
                  <SetMatchStatus match={data} />
                ) : (
                  <div>
                    {data.status == MatchStatusEnum.CANCEL
                      ? "Cancelled"
                      : data.status}
                  </div>
                )}
                <div className="mt-5">
                  {isFetching && <div className={style.spinner}>Update</div>}
                </div>
              </div>
            </div>
            <hr className="mt-5" />
            <div className="flex  justify-around items-start">
              <div className="w-[50%] mt-4 mb-4">
                <UserWrapper
                  user={data.user_1}
                  index={1}
                  match={data}
                  userText={data.text_user_1}
                />
                <div className="mt-5">
                  <UserWrapper
                    user={data.user_2}
                    index={2}
                    match={data}
                    userText={data.text_user_2}
                  />
                </div>
              </div>

              <div className="w-[1px] h-[140px] bg-fg"></div>
              <div className="w-[50%] mt-4 mb-4 ml-2">
                <UserWrapper
                  user={data.user_3}
                  index={3}
                  match={data}
                  userText={data.text_user_3}
                  isReverse={true}
                />
                <div className="mt-5">
                  <UserWrapper
                    user={data.user_4}
                    index={4}
                    match={data}
                    userText={data.text_user_4}
                    isReverse={true}
                  />
                </div>
              </div>
            </div>
            <div>
              {data.status == "done" && (
                <>
                  {permission ? (
                    <SetMatchScores match={match} />
                  ) : (
                    <MatchScore match={match} />
                  )}
                </>
              )}
            </div>
          </>
        )}
        {!isLoading && data && <RepostButton math={match} />}
      </div>
    </div>
  );
};
