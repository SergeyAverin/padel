import FriendRequestStore from "@store/friendRequests";
import UserStore from "@store/user";

export const useCancelFriendRequest = (
  friendRequestId: number,
  userId: string
) => {
  return async () => {
    UserStore.relationStatus = "no_friend";
    console.log(friendRequestId);
    await FriendRequestStore.cancelFriendRequest(friendRequestId);
    // await UserStore.getRelationStatus(userId);
  };
};
