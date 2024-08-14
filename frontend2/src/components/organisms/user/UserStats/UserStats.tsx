import React from "react";
// import { useParams } from "react-router-dom";

import LoadPlaceholder from "@atoms/LoadPlaceholder";
import Stat from "@molecules/user/Stat";
import { useGetUserStatsQuery } from "@redux/api/userApi";

import style from "./style.module.css";
import classNames from "classnames";

interface IUserStatsProps {
  userId: string;
}

export const UserStats: React.FC<IUserStatsProps> = ({ userId }) => {
  const { data, isLoading } = useGetUserStatsQuery(userId as string);
  return (
    <>
      <div
        className={classNames(
          "bg-primary p-5 rounded-md flex justify-around items-start h-[125px]",
          `${isLoading && style.animatedBackground}`
        )}
      >
        {!isLoading && data ? (
          <>
            <Stat count={data.friends_count} text="Friends" />
            <Stat count={data.matches_count} text="Match" />
            <Stat count={data.clubs_count} text="Clubs" />
          </>
        ) : (
          <>
            <LoadPlaceholder />
            <LoadPlaceholder />
            <LoadPlaceholder />
          </>
        )}
      </div>
    </>
  );
};
