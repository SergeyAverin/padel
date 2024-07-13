import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import UserStore from "@store/user";
import CreateFriendRequest from "@molecules/friends/CreateFriendRequest";
import { useParams } from "react-router-dom";
import CancelFriendRequest from "@molecules/friends/CancelFriendRequest";
import UnFriend from "@molecules/friends/UnFriend";

export const RelationButton: React.FC = observer(() => {
  const { userId } = useParams();
  useEffect(() => {
    console.log("send");
    if (userId) {
      UserStore.getRelationStatus(userId);
    }
  }, [userId]);
  function isNumber(str: string) {
    return /^-?\d+(\.\d+)?$/.test(str);
  }
  return (
    <>
      {UserStore.relationStatus == "no_friend" && userId && (
        <CreateFriendRequest userId={userId} />
      )}
      {UserStore.relationStatus == "friend" && userId && (
        <UnFriend friendId={userId} />
      )}
      {isNumber(UserStore.relationStatus) && userId && (
        <CancelFriendRequest
          requestId={Number(UserStore.relationStatus)}
          userId={userId}
        />
      )}
      {UserStore.relationStatus == "await_answer" && userId && (
        <div>Await answer on friend request</div>
      )}
    </>
  );
});
