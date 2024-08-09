import { useEffect } from "react";

import AuthStore from "../store/auth";

export const useAuth = (userId: string) => {
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      AuthStore.login(userId);
      AuthStore.acceptUser();
    } else {
      alert("accept user");
      AuthStore.setAuth();
      AuthStore.acceptUser();
    }
  }, [userId]);
};
