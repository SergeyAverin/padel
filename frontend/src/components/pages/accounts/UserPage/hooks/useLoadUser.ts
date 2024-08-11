import { useEffect } from "react";
import { useParams } from "react-router-dom";

import UserStore from "@store/account/user";

export const useLoadUser = () => {
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      UserStore.getUserInfo(userId);
    }
    return () => {
      UserStore.setUser(null);
    };
  }, [userId]);
};
