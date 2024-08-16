import { Heading, HeadingVariant } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import Match from "@organisms/matches/Match";
import { useGetFriendsMathchesQuery } from "@redux/api/matchesApi";
import { IMatch } from "@schemas/match";
import { IUser } from "@schemas/user";
import React, { useState } from "react";

export const MatchFriendTemplate: React.FC = () => {
  const [page, setPage] = useState(1);
  const user = useAuthUser() as IUser;
  const loadMatches = useGetFriendsMathchesQuery({
    page: page,
    userId: user.telegram_user_id,
  });

  const matches = useInfinityScroll<IMatch>(
    page,
    setPage,
    loadMatches.data,
    loadMatches.isFetching
  );
  return (
    <>
      {matches.length == 0 && <EmptyBanner text="You have not matches" />}
      {matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>
            Matches from your friends
          </Heading>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_status">
              If you own the match you can change the status of the match and if
              the match is completed you can change the match score. And you can
              choose the users who will be in your match.
            </HelpBanner>
          </div>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_join">
              You can enter open matches if your level matches the level of the
              match.
            </HelpBanner>
          </div>
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
