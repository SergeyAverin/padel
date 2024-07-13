import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import UserStore from "@store/user";
import UserTemplate from "@templates/UserTemplate";
import { Spinner } from "@atoms/index";

export const UserPage: React.FC = observer(() => {
  const { userId } = useParams();
  useEffect(() => {
    if (userId) {
      UserStore.getUserInfo(userId);
    }
    return () => {
      UserStore.user = null;
    };
  }, [userId]);
  return <>{UserStore.user ? <UserTemplate /> : <Spinner />}</>;
});
