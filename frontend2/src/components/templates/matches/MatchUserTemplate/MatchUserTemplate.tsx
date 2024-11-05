import { Heading, HeadingVariant, Loading } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import Match from "@organisms/matches/Match";
import { useGetUserMatchesQuery } from "@redux/api/matchesApi";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import { IUser } from "@schemas/user";
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
  const authUser = useAuthUser() as IUser;

  matches = matches.filter((match) => {
    function parseRange(range: string): [number, number] {
      // Разделяем строку по символу '-'
      const parts = range.split("-");

      // Преобразуем каждую часть в число
      const num1 = parseFloat(parts[0]);
      const num2 = parseFloat(parts[1]);

      // Возвращаем кортеж с двумя числами
      return [num1, num2];
    }
    if (isMatchPage) {
      const isCanceled = match.status == MatchStatusEnum.CANCEL;
      console.log(match.gender);
      console.log(match);
      // const isInvalidGender =
      //   match.gender != Gender.ANY && match.gender != authUser.gender;
      const isInvalidLvl =
        authUser.lvl < parseRange(match.match_lvl)[0] ||
        authUser.lvl > parseRange(match.match_lvl)[1];
      if (isCanceled || isInvalidLvl || false) {
        return false;
      } else {
        return true;
      }
    } else return true;
  });
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
              {/* <Heading variant={HeadingVariant.H2}>Archived:</Heading> */}
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
