import { Spinner } from "@atoms/index";
import { useAuthUser } from "@hooks/useAuthUser";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import HelpBanner from "@organisms/core/HelpBanner";
import FriendCard from "@organisms/friends/FriendCard";
import { useGetFriendsQuery } from "@redux/api/friendsApi";
import React from "react";

export const FriendsTemplate: React.FC = () => {
  const user = useAuthUser();
  const { data, isLoading } = useGetFriendsQuery(
    user?.telegram_user_id as string
  );
  return (
    <div>
      <HelpBanner localStorageKey="help_tag" isInNavigation={true}>
        You can group friends by tag. You can create private matches for a
        selected category of friends.
      </HelpBanner>
      {!isLoading && data ? (
        <>
          {/* Filter */}
          {/* <FriendsFilter /> */}

          {/* Empty banner */}
          {data.length == 0 && (
            <EmptyBanner text="This is where your friends will be listed." />
          )}

          {/* Friends */}
          <div>
            {data.map((user) => (
              <div key={user.telegram_user_id} className="mb-3">
                <FriendCard user={user} />
              </div>
            ))}
          </div>
        </>
      ) : (
        // Loading
        <Spinner />
      )}
    </div>
  );
};
