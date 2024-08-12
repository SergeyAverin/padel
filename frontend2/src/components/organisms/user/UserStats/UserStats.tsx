import React from "react";

import Stat from "@molecules/user/Stat";
import { useGetUserStatsQuery } from "@redux/api/userApi";
import { useParams } from "react-router-dom";

export const UserStats: React.FC = () => {
  // const { userId } = useParams();
  const userId = "339433633";
  const { data, isLoading } = useGetUserStatsQuery(userId as string);
  return (
    <>
      <div className="bg-primary p-5 rounded-md flex justify-around items-start">
        {!isLoading && data && (
          <>
            <Stat count={data.friends_count} text="Friends" />
            <Stat count={data.matches_count} text="Match" />
            <Stat count={data.clubs_count} text="Clubs" />
          </>
        )}
      </div>
    </>
  );
};
