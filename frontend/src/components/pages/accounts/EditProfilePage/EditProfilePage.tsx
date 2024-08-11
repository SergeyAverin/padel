import EditProfileTemplate from "@templates/accounts/EditProfileTemplate";
import React from "react";
import { observer } from "mobx-react-lite";

import { Spinner } from "@atoms/index";
import UserStore from "@store/account/user";

export const EditProfilePage: React.FC = observer(() => {
  return <>{UserStore.user ? <EditProfileTemplate /> : <Spinner />}</>;
});
