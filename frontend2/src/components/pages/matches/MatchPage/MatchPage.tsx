import { Spinner } from "@atoms/index";
import Match from "@organisms/matches/Match";
import { useGetMaatchByIdQuery } from "@redux/api/matchApi";
import React from "react";
import { useParams } from "react-router-dom";

export const MatchPage: React.FC = () => {
  const { matchId } = useParams();
  const { data, isLoading } = useGetMaatchByIdQuery(Number(matchId) as number);
  return (
    <div>{isLoading ? <Spinner /> : <>{data && <Match match={data} />}</>}</div>
  );
};
