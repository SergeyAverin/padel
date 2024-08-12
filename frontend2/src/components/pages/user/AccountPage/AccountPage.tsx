import React from "react";
import { useSelector } from "react-redux";

import UserTemplate from "@templates/user/UserTemplate";
import { Button, ButtonVariant, Spinner } from "@atoms/index";
import { Link } from "react-router-dom";
import { authUserSelector } from "@redux/selectors/authSelectors";

export const AccountPage: React.FC = () => {
  const authUser = useSelector(authUserSelector);
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
