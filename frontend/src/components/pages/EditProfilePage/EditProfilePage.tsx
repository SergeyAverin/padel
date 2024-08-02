import EditProfileTemplate from "@templates/EditProfileTemplate";
import React from "react";
import { observer } from "mobx-react-lite";

import { Spinner } from "@atoms/index";
import UserStore from "@store/user";

export const EditProfilePage: React.FC = observer(() => {
  return <>{UserStore.user ? <EditProfileTemplate /> : <Spinner />}</>;
});
