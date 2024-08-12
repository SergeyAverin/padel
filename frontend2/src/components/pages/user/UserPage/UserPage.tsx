import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { useGetUserByIdQuery } from "@redux/api/userApi";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@atoms/index";

export const UserPage: React.FC = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(userId as string);
  return (
    <>
      {!isLoading && data ? (
        <UserTemplate user={data} button={<Button>test</Button>} />
      ) : (
        <Spinner />
      )}
    </>
  );
};
