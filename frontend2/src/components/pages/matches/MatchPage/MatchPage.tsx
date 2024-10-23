import { Heading, HeadingVariant, Spinner } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import JoinRequst from "@molecules/matches/JoinRequst";
import Match from "@organisms/matches/Match";
import { useGetJoinRequsetQuery } from "@redux/api/joinRequestApi";
import { useGetMaatchByIdQuery } from "@redux/api/matchApi";
import React from "react";
import { useParams } from "react-router-dom";

export const MatchPage: React.FC = () => {
  const { matchId } = useParams();
  const { data, isLoading } = useGetMaatchByIdQuery(Number(matchId) as number);
  const joinRequset = useGetJoinRequsetQuery(Number(matchId) as number);
  const user = useAuthUser();
  return (
    <div>
      {isLoading ? <Spinner /> : <>{data && <Match match={data} />}</>}
      <div className="mt-3">
        {!joinRequset.isLoading &&
          joinRequset.data &&
          joinRequset.data?.length > 0 && (
            <div className="mb-5">
              {data?.owner?.telegram_user_id == user?.telegram_user_id && (
                <>
                  {joinRequset.data?.length != 0 && (
                    <Heading variant={HeadingVariant.H2}>
                      Request on join in game:
                    </Heading>
                  )}
                  {joinRequset.data && (
                    <div>
                      {joinRequset.data.map((i) => (
                        <div className="bg-primary rounded-xl">
                          <JoinRequst joinRequst={i} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
      </div>
    </div>
  );
};
