import FriendRequestStore from "@store/friendRequests";

export const useCancelFriendRequest = (friendRequestId: number) => {
  return () => {
    FriendRequestStore.cancelFriendRequest(friendRequestId);
  };
};
