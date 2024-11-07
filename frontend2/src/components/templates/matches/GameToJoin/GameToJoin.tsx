import { Heading, HeadingVariant } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import { useInfinityScroll } from "@hooks/useInfinityScroll";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import Match from "@organisms/matches/Match";
import { useGetJoinGameQuery } from "@redux/api/matchesApi";
import { IMatch, MatchStatusEnum } from "@schemas/match";
import { IUser } from "@schemas/user";
import React, { useState } from "react";

export const GameToJoin: React.FC = () => {
  const [page, setPage] = useState(1);
  const user = useAuthUser() as IUser;
  const loadMatches = useGetJoinGameQuery({
    page: page,
    userId: user.telegram_user_id,
  });

  let matches = useInfinityScroll<IMatch>(
    page,
    setPage,
    loadMatches.data,
    loadMatches.isFetching
  );

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
    const isCanceled = match.status == MatchStatusEnum.CANCEL;
    console.log("match.gender");
    console.log(match);
    // const isInvalidGender =
    //   match.gender != Gender.ANY && match.gender != authUser.gender;
    const isInvalidLvl =
      authUser.lvl < parseRange(match.match_lvl)[0] ||
      authUser.lvl > parseRange(match.match_lvl)[1];
    console.log("match.user_1");
    console.log(match.user_1);
    const isUserInMatch =
      match.user_1?.telegram_user_id == user.telegram_user_id ||
      match.user_2?.telegram_user_id == user.telegram_user_id ||
      match.user_3?.telegram_user_id == user.telegram_user_id ||
      match.user_4?.telegram_user_id == user.telegram_user_id;
    if (isCanceled || isInvalidLvl || isUserInMatch) {
      return false;
    } else {
      return true;
    }
  });
  return (
    <>
      {/* games */}
      {matches.length == 0 && <EmptyBanner text="You have not games" />}
      {matches.length != 0 && (
        <div>
          <Heading variant={HeadingVariant.H2}>Find the game:</Heading>
          {matches
            .slice()
            .reverse()
            .map((match) => (
              <>
                {Number(match.match_lvl.split("-")[0]) <= user.lvl &&
                  Number(match.match_lvl.split("-")[1]) >= user.lvl && (
                    <div className="mt-3" key={match.id}>
                      <Match match={match} />
                    </div>
                  )}
              </>
            ))}
        </div>
      )}
    </>
  );
};
