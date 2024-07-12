import { useEffect } from "react";
import UserStore from "@store/user";
import AuthStore from "@store/auth";

export const useLoadUserInfo = () => {
  useEffect(() => {
    if (AuthStore.authUser) {
      UserStore.getUserInfo(AuthStore.authUser.telegram_user_id);
    }
  }, [AuthStore.authUser]);
};
