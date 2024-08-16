import { Heading, HeadingVariant } from "@atoms/index";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import Match from "@organisms/matches/Match";
import { useGetUserMatchesQuery } from "@redux/api/matchesApi";
import { IMatch } from "@schemas/match";
import React, { useState } from "react";

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
  return (
    <>
      {matches.length == 0 && <EmptyBanner text="Have not matches" />}

      {matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>Your match</Heading>
          {isMatchPage && (
            <>
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
          {matches
            .slice()
            .reverse()
            .map((match) => (
              <div className="mt-3" key={match.id}>
                <Match match={match} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};
