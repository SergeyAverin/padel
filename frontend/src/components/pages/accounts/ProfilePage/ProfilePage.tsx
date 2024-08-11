import React from "react";
import { observer } from "mobx-react-lite";

import AuthStore from "@store/account/auth";
import { Spinner } from "@atoms/index";
import ProfileTemplate from "@templates/accounts/ProfileTemplate";

export const ProfilePage: React.FC = observer(() => {
  return <>{AuthStore.authUser ? <ProfileTemplate /> : <Spinner />}</>;
});
