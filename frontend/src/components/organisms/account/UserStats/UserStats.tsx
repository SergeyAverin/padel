import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import Stat from "@molecules/account/Stat";
import UserStore from "@store/user";

export const UserStats: React.FC = observer(() => {
  useEffect(() => {
    if (UserStore.user) {
      UserStore.getStats(UserStore.user.telegram_user_id);
    }
    return () => {
      UserStore.stats = {
        clubs_count: 0,
        friends_count: 0,
        matches_count: 0,
      };
    };
  }, [UserStore.user]);
  return (
    <>
      {UserStore.stats && (
        <div className="bg-primary p-5 rounded-md flex justify-around items-start">
          <Stat count={UserStore.stats.friends_count} text="Friends" />
          <Stat count={UserStore.stats.matches_count} text="Match" />
          <Stat count={UserStore.stats.clubs_count} text="Clubs" />
        </div>
      )}
    </>
  );
});
