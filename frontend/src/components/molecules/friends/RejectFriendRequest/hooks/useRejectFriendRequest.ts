import FriendRequestStore from "@store/friends/friendRequests";

export const useRejectFriendRequest = (friendRequestId: number) => {
  return () => {
    FriendRequestStore.rejectFriendRequest(friendRequestId);
  };
};
