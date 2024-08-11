import EditProfileTemplate from "@templates/accounts/EditProfileTemplate";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Spinner } from "@atoms/index";
import AuthStore from "@store/account/auth";
import UserStore from "@store/account/user";

export const EditProfilePage: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser) {
      UserStore.setUser(AuthStore.authUser);
    }
    return () => {
      UserStore.setUser(null);
    };
  }, []);
  return <>{UserStore.user ? <EditProfileTemplate /> : <Spinner />}</>;
});
