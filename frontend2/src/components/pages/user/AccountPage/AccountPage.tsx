import React from "react";
import { Link } from "react-router-dom";

import UserTemplate from "@templates/user/UserTemplate";
import { Button, ButtonVariant, Spinner } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";

export const AccountPage: React.FC = () => {
  const authUser = useAuthUser();
  return (
    <>
      {authUser ? (
        <UserTemplate
          user={authUser}
          button={
            <Link to="/profile/edit">
              <Button variant={ButtonVariant.OUTLINED}>Edit</Button>
            </Link>
          }
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};
