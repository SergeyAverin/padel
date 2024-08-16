import React from "react";

import UserTemplate from "@templates/user/UserTemplate";
import { useGetUserByIdQuery } from "@redux/api/userApi";
import { useParams } from "react-router-dom";
import { Spinner } from "@atoms/index";
import HelpBanner from "@organisms/core/HelpBanner";
import { useGetRelationStatusQuery } from "@redux/api/friendsApi";
import CreateFriendRequest from "@molecules/friends/CreateFriendRequest";
import CancelFriendRequest from "@molecules/friends/CancelFriendRequest";
import UnFriend from "@molecules/friends/UnFriend";

export const UserPage: React.FC = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(userId as string);
  const relation = useGetRelationStatusQuery(userId as string);
  function isNumber(str: string) {
    return /^-?\d+(\.\d+)?$/.test(str);
  }
  return (
    <>
      {!isLoading && data ? (
        <>
          <UserTemplate
            user={data}
            button={
              <>
                {relation.data && (
                  <>
                    {relation.data == "no_friend" && (
                      <CreateFriendRequest userId={userId as string} />
                    )}
                    {relation.data == "friend" && userId && (
                      <UnFriend friendId={userId} />
                    )}
                    {isNumber(relation.data) && (
                      <CancelFriendRequest requestId={Number(relation.data)} />
                    )}
                    {relation.data == "await_answer" && userId && (
                      <div>Await answer on friend request</div>
                    )}
                  </>
                )}
              </>
            }
          />
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
