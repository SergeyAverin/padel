from logging import getLogger

from friends.models import FriendRequest
from account.models import User
from account.service import user_service


logger = getLogger()


class FriendRequestRepository:
    async def create_friend_request(self, sender_user_id: str, recipient_user_id: str):
        sender_user = await user_service.get_user_by_telegram_user_id(sender_user_id)
        recipient_user = await user_service.get_user_by_telegram_user_id(recipient_user_id)
        friend_request = FriendRequest(
            sender_user=sender_user,
            recipient_user=recipient_user
        )
        await friend_request.save()
        return friend_request

    async def get_friend_request_by_id(friend_request_id: int) -> None | FriendRequest:
        return await FriendRequest.get_or_none(id=friend_request_id)

    async def get_friends_requests_by_user(self, telegram_user_id: str):
        friend_requests = await FriendRequest.filter(
            sender_user__telegram_user_id=telegram_user_id
        )
        return friend_requests

    def delete_friend_request(self):
        pass


class FriendRepository:
    def add_friend(self):
        pass

    def remove_friend(self):
        pass
