import { Heading, HeadingVariant } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import Match from "@organisms/matches/Match";
import { useGetAllMatchesQuery } from "@redux/api/matchesApi";
import { IMatch } from "@schemas/match";
import { IUser } from "@schemas/user";
import React, { useState } from "react";

export const AllGamesTemplate: React.FC = () => {
  const [page, setPage] = useState(1);
  const user = useAuthUser() as IUser;
  const loadMatches = useGetAllMatchesQuery({
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
      {/* archive */}
      {matches.length == 0 && <EmptyBanner text="You have not games" />}
      {matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>All games:</Heading>
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
