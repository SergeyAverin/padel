import FriendRequestStore from "@store/friendRequests";
import UserStore from "@store/user";

export const useCancelFriendRequest = (friendRequestId: number) => {
  return async () => {
    UserStore.relationStatus = "no_friend";
    await FriendRequestStore.cancelFriendRequest(friendRequestId);
    // await UserStore.getRelationStatus(userId);
  };
};
