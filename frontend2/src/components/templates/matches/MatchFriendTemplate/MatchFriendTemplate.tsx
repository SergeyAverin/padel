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
      {matches.length == 0 && <EmptyBanner text="You have not games" />}
      {matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>Games from your friends</Heading>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_status">
              If you own the game you can change the status of the game and if
              the game is completed you can change the game score. And you can
              choose the users who will be in your game.
            </HelpBanner>
          </div>
          <div className="mb-3">
            <HelpBanner localStorageKey="help_match_join">
              You can enter open games if your level games the level of the
              game.
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
