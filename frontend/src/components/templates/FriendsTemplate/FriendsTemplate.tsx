import React from "react";
import { observer } from "mobx-react-lite";

import FriendCard from "@organisms/friends/FriendCard";
import FriendStore from "@store/friends";
import FriendsFilter from "@organisms/friends/FriendsFilter";
import { EmptyBanner } from "@organisms/EmptyBanner/EmptyBanner";
import { Spinner } from "@atoms/index";

export const FriendsTemplate: React.FC = observer(() => {
  return (
    <div>
      {!FriendStore.isLoading ? (
        <>
          <FriendsFilter />
          {FriendStore.friends.length == 0 && (
            <EmptyBanner text="You have not friends" />
          )}

          <div>
            {FriendStore.friends.map((user) => (
              <FriendCard user={user} key={user.telegram_user_id} />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});
