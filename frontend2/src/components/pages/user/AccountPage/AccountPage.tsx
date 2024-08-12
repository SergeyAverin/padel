import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { Button, ButtonVariant, Spinner } from "@atoms/index";
import { useGetUserByIdQuery } from "@redux/api/userApi";

export const AccountPage: React.FC = () => {
  const { data, isLoading } = useGetUserByIdQuery("339433633");
  return (
    <>
      {!isLoading && data ? (
        <UserTemplate
          user={data}
          button={<Button variant={ButtonVariant.OUTLINED}>Edit</Button>}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};
