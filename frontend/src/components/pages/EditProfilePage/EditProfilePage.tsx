import EditProfileTemplate from "@templates/EditProfileTemplate";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import UserStore from "@store/user";
import AuthStore from "@store/auth";
import { Spinner } from "@atoms/index";

export const EditProfilePage: React.FC = observer(() => {
  useEffect(() => {
    if (AuthStore.authUser) {
      UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
    }
  }, [AuthStore.authUser]);
  return <>{UserStore.user ? <EditProfileTemplate /> : <Spinner />}</>;
});
