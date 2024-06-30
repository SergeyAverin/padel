import { useEffect } from "react";
import UserStore from "@store/user";

export const useLoadUserInfo = () => {
  useEffect(() => {
    UserStore.getUserInfo("3");
  }, []);
};
