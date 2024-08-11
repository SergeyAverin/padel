import FriendRequestStore from "@store/friends/friendRequests";

export const useAcceptFriendRequest = (friendRequestId: number) => {
  return () => {
    FriendRequestStore.acceptFriendRequest(friendRequestId);
  };
};
