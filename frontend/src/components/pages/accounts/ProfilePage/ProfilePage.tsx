import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import AuthStore from "@store/account/auth";
import UserStore from "@store/account/user";
import { Spinner } from "@atoms/index";
import ProfileTemplate from "@templates/accounts/ProfileTemplate";

export const ProfilePage: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser) {
      UserStore.setUser(AuthStore.authUser);
    }
    return () => {
      UserStore.setUser(null);
    };
  }, []);
  return <>{AuthStore.authUser ? <ProfileTemplate /> : <Spinner />}</>;
});
