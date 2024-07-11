import { useEffect } from "react";

import AuthStore from "../store/auth";

export const useAuth = (userId: string) => {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      AuthStore.login(userId);
    } else {
      AuthStore.setAuth();
    }
  }, [userId]);
};
