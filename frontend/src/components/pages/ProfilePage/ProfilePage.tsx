import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProfileTemplate from "@templates/ProfileTemplate";
import UserStore from "@store/user";
import AuthStore from "@store/auth";
import MatchStore from "@store/match";
import { Spinner } from "@atoms/index";

export const ProfilePage: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser?.telegram_user_id) {
      UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
      MatchStore.loadUserMatches(AuthStore.authUser.telegram_user_id);
    }
    return () => {
      UserStore.user = null;
    };
  }, [AuthStore.authUser]);
  return <>{UserStore.user ? <ProfileTemplate /> : <Spinner />}</>;
});
