import FriendRequestsStore from "@store/friends/friendRequests";
import UserStore from "@store/account/user";

export const useCreateFriendRequest = (userId: string) => {
  const onCreateFriendRequest = async () => {
    const reqId = await FriendRequestsStore.createFriendRequest(userId);
    UserStore.relationStatus = String(reqId);
  };
  return onCreateFriendRequest;
};
