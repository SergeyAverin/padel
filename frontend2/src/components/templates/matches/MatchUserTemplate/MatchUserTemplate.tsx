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

  const matches = useInfinityScroll<IMatch>(
    page,
    setPage,
    loadMatches.data,
    loadMatches.isFetching
  );
  useEffect(() => {
    console.log("change");
  }, [userId]);
  return (
    <>
      {!isMatchPage && <Heading variant={HeadingVariant.H2}>Matches:</Heading>}
      {matches.length == 0 && (
        <div className="mt-5">
          <EmptyBanner text="Have not matches" />
        </div>
      )}

      {matches.length != 0 && (
        <div>
          {isMatchPage && (
            <>
              <Heading variant={HeadingVariant.H2}>Your matches:</Heading>
              <div className="mb-3">
                <HelpBanner localStorageKey="help_match_status">
                  If you own the match you can change the status of the match
                  and if the match is completed you can change the match score.
                  And you can choose the users who will be in your match.
                </HelpBanner>
              </div>
              <div className="mb-3">
                <HelpBanner localStorageKey="help_match_join">
                  You can enter open matches if your level matches the level of
                  the match.
                </HelpBanner>
              </div>
            </>
          )}
          {(loadMatches.isLoading || loadMatches.isFetching) && page == 1 && (
            <div className="pt-[60px] flex justify-center">
              <Loading />
            </div>
          )}
          {(!loadMatches.isLoading || !loadMatches.isFetching) && page != 1 && (
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
          )}
        </div>
      )}
    </>
  );
};
