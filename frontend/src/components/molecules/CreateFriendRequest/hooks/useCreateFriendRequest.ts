import FriendRequestsStore from "../../../../store/friendRequests";

export const useCreateFriendRequest = (userId: string) => {
  const onCreateFriendRequest = () => {
    FriendRequestsStore.createFriendRequest(userId);
  };
  return onCreateFriendRequest;
};
