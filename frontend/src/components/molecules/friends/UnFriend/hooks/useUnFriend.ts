import FriendStore from "@store/friends";

export const useUnFriend = (friendId: string) => {
  return () => {
    FriendStore.unFriends(friendId);
  };
};
