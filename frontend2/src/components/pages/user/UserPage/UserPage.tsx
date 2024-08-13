import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { useGetUserByIdQuery } from "@redux/api/userApi";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@atoms/index";
import HelpBanner from "@organisms/core/HelpBanner";

export const UserPage: React.FC = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(userId as string);
  return (
    <>
      {!isLoading && data ? (
        <>
          <UserTemplate user={data} button={<Button>test</Button>} />
          <HelpBanner localStorageKey="help_profile" isInNavigation={true}>
            This is your profile, it displays information about you and the
            matches you participate in. You can edit your information.
          </HelpBanner>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
