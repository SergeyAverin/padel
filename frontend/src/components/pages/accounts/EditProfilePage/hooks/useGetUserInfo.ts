import { useEffect } from "react";

import AuthStore from "@store/account/auth";
import UserStore from "@store/account/user";

export const useGetUserInfo = () => {
  useEffect(() => {
    if (AuthStore.authUser) {
      UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
    }
  }, [AuthStore.authUser]);
};
