from friends.repositories import FriendRepository, FriendRequestRepository


class FriendRequestService:
    def __init__(self) -> None:
        self.friend_request_repository = FriendRequestRepository()
        self.friend_repository = FriendRepository()

    async def create_friend_request(self, sender_user_id: str, recipient_user_id: str):
        await self.friend_request_repository.create_friend_request(sender_user_id, recipient_user_id)

    def accept_friend_request(self):
        # friend_repository.add_friend()
        # friend_request_repository.delete_friend_request()
        pass

    def reject_friend_request(self):
        # friend_request_repository.delete_friend_request()
        pass

    async def get_friend_requests_by_user(self, user_id: str):
        friend_requests = await self.friend_request_repository.get_friends_requests_by_user(
            user_id)
        return friend_requests

    # отмена запроса


class FriendService:
    def remove_user_friend(self):
        # friend_repository.remove_friend()
        pass

    def add_user_friend(self):
        # friend_repository.add_friend()
        pass


friend_request_service = FriendRequestService()
