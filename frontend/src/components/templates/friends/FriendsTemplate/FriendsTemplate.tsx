import React from "react";
import { observer } from "mobx-react-lite";

import { Spinner } from "@atoms/index";
import FriendCard from "@organisms/friends/FriendCard";
import FriendsFilter from "@organisms/friends/FriendsFilter";
import { EmptyBanner } from "@organisms/core/EmptyBanner/EmptyBanner";
import FriendStore from "@store/friends/friends";
import HelpBanner from "@organisms/core/HelpBanner";

export const FriendsTemplate: React.FC = observer(() => {
  return (
    <div>
      <HelpBanner localStorageKey="help_tag" isInNavigation={true}>
        You can group friends by tag. You can create private matches for a
        selected category of friends.
      </HelpBanner>
      {!FriendStore.isLoading ? (
        <>
          {/* Filter */}
          <FriendsFilter />

          {/* Empty banner */}
          {FriendStore.friends.length == 0 && (
            <EmptyBanner text="This is where your friends will be listed." />
          )}

          {/* Friends */}
          <div>
            {FriendStore.friends.map((user) => (
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
});
