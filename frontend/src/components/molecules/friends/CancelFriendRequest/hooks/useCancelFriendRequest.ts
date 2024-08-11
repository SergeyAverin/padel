import FriendRequestStore from "@store/friends/friendRequests";
import UserStore from "@store/account/user";

export const useCancelFriendRequest = (friendRequestId: number) => {
  return async () => {
    UserStore.setRelationStatus("no_friend");
    await FriendRequestStore.cancelFriendRequest(friendRequestId);
    // await UserStore.getRelationStatus(userId);
  };
};
