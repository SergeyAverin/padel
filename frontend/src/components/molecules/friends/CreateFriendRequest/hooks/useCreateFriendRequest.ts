import FriendRequestsStore from "@store/friendRequests";
import UserStore from "@store/user";

export const useCreateFriendRequest = (userId: string) => {
  const onCreateFriendRequest = async () => {
    const reqId = await FriendRequestsStore.createFriendRequest(userId);
    UserStore.relationStatus = String(reqId);
  };
  return onCreateFriendRequest;
};
