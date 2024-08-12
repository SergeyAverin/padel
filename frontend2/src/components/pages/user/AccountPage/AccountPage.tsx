import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { Button, ButtonVariant, Spinner } from "@atoms/index";
import { useGetUserByIdQuery } from "@redux/api/userApi";
import { Link } from "react-router-dom";

export const AccountPage: React.FC = () => {
  const { data, isLoading } = useGetUserByIdQuery("339433633");
  return (
    <>
      {!isLoading && data ? (
        <UserTemplate
          user={data}
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
