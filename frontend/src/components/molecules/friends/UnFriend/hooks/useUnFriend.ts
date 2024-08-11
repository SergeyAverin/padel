import FriendStore from "@store/friends/friends";

export const useUnFriend = (friendId: string) => {
  return () => {
    FriendStore.unFriends(friendId);
  };
};
