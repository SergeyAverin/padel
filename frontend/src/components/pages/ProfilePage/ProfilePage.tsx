import React from "react";
import { observer } from "mobx-react-lite";
import ProfileTemplate from "@templates/ProfileTemplate";
import UserStore from "@store/user";
import { Spinner } from "@atoms/index";

export const ProfilePage: React.FC = observer(() => {
  return <>{UserStore.user ? <ProfileTemplate /> : <Spinner />}</>;
});
