import { Heading, HeadingVariant, Loading } from "@atoms/index";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import Match from "@organisms/matches/Match";
import { useGetUserMatchesQuery } from "@redux/api/matchesApi";
import { IMatch } from "@schemas/match";
import React, { useEffect, useState } from "react";

interface IMatchUserTemplateProps {
  userId: string;
  isMatchPage?: boolean;
}

export const MatchUserTemplate: React.FC<IMatchUserTemplateProps> = ({
  userId,
  isMatchPage = false,
}) => {
  const [page, setPage] = useState(1);
  const loadMatches = useGetUserMatchesQuery({
    page: page,
    userId: userId,
  });

  let matches = useInfinityScroll<IMatch>(
    page,
    setPage,
    loadMatches.data,
    loadMatches.isFetching
  );
  useEffect(() => {
    if (loadMatches.isLoading == false) {
      matches = [];
    }
  }, []);
  return (
    <>
      {!isMatchPage && <Heading variant={HeadingVariant.H2}>Games:</Heading>}
      {!loadMatches.isLoading && matches.length == 0 && (
        <div className="mt-5">
          <EmptyBanner text="Have not games" />
        </div>
      )}

      {matches.length != 0 && (
        <div>
          {isMatchPage && (
            <>
              <Heading variant={HeadingVariant.H2}>Archived:</Heading>
              <div className="mb-3">
                <HelpBanner localStorageKey="help_match_status">
                  If you own the game you can change the status of the game and
                  if the game is completed you can change the game score. And
                  you can choose the users who will be in your game.
                </HelpBanner>
              </div>
              <div className="mb-3">
                <HelpBanner localStorageKey="help_match_join">
                  You can enter open games if your level games the level of the
                  game.
                </HelpBanner>
              </div>
            </>
          )}
          {loadMatches.isLoading && (
            <div className="pt-[60px] flex justify-center">
              <Loading />
            </div>
          )}
          <>
            {matches
              .slice()
              .reverse()
              .map((match) => (
                <div className="mt-3" key={match.id}>
                  <Match match={match} />
                </div>
              ))}
          </>
        </div>
      )}
    </>
  );
};
