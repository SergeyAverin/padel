import React from "react";
import { observer } from "mobx-react-lite";

import { useLoadUser } from "./hooks/useLoadUser";
import { Spinner } from "@atoms/index";
import UserTemplate from "@templates/accounts/UserTemplate";
import UserStore from "@store/account/user";

export const UserPage: React.FC = observer(() => {
  useLoadUser();
  return <>{UserStore.user ? <UserTemplate /> : <Spinner />}</>;
});
