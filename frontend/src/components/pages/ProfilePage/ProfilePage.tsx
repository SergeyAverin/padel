import React from "react";
import { observer } from "mobx-react-lite";
import ProfileTemplate from "@templates/ProfileTemplate";
import AuthStore from "@store/auth";
import { Spinner } from "@atoms/index";

export const ProfilePage: React.FC = observer(() => {
  return <>{AuthStore.authUser ? <ProfileTemplate /> : <Spinner />}</>;
});
