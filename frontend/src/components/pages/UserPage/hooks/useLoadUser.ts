import { useEffect } from "react";
import { useParams } from "react-router-dom";

import UserStore from "@store/user";

export const useLoadUser = () => {
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      UserStore.getUserInfo(userId);
    }
    return () => {
      UserStore.user = null;
    };
  }, [userId]);
};