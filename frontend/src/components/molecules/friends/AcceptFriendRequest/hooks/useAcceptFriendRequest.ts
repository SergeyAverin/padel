import FriendRequestStore from "@store/friendRequests";

export const useAcceptFriendRequest = (friendRequestId: number) => {
  return () => {
    FriendRequestStore.acceptFriendRequest(friendRequestId);
  };
};
