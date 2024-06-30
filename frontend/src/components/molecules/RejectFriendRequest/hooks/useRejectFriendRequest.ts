import FriendRequestStore from "@store/friendRequests";

export const useRejectFriendRequest = (friendRequestId: number) => {
  return () => {
    FriendRequestStore.rejectFriendRequest(friendRequestId);
  };
};
