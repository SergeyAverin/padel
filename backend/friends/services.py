from logging import getLogger

from friends.repositories import FriendRepository, FriendRequestRepository, TagRepository
from account.service import user_service

logger = getLogger()


class FriendRequestService:
    def __init__(self) -> None:
        self.friend_request_repository = FriendRequestRepository()
        self.friend_repository = FriendRepository()
        self.friend_service = FriendService()

    async def create_friend_request(self, sender_user_id: str, recipient_user_id: str):
        return await self.friend_request_repository.create_friend_request(
            sender_user_id,
            recipient_user_id
        )

    async def accept_friend_request(self, friend_request_id: int):
        friend_request = await self.friend_request_repository.get_friend_request_by_id(
            friend_request_id
        )
        sender_user = await friend_request.sender_user
        recipient_user = await friend_request.recipient_user
        await self.friend_service.add_user_friend(
            sender_user.telegram_user_id, recipient_user.telegram_user_id)
        await self.friend_request_repository.delete_friend_request(friend_request_id)

    async def reject_friend_request(self, friend_request_id: int):
        await self.cancel_friend_request(friend_request_id)

    async def get_friend_requests_by_user(self, user_id: str):
        friend_requests = await self.friend_request_repository.get_friends_requests_by_user(
            user_id)
        return friend_requests

    async def cancel_friend_request(self, friend_request_id: int):
        await self.friend_request_repository.delete_friend_request(friend_request_id)


class FriendService:
    def __init__(self) -> None:
        self.friend_repository = FriendRepository()

    async def remove_user_friend(self, sender_user_id: str, recipient_user_id: str):
        await self.friend_repository.remove_friend(sender_user_id, recipient_user_id)

    async def add_user_friend(self, sender_user_id: str, recipient_user_id: str):
        await self.friend_repository.add_friend(sender_user_id, recipient_user_id)

    async def get_user_friends(self, user_id: str):
        user = await user_service.get_user_by_telegram_user_id(user_id)
        user_friends = await user.friends.all()
        return user_friends

    async def get_user_relation_status(self, from_user_id: str, to_user_id: str):
        user_friends = await self.get_user_friends(from_user_id)
        status = 'no_friend'
        for friend in user_friends:
            if friend.telegram_user_id == to_user_id:
                status = 'friend'
        return status


class TagsService:
    def __init__(self) -> None:
        self.tag_repository = TagRepository()

    async def get_user_tags(self, user_id: str):
        ''' Дает теги которые принадлежат пользователю. '''
        return await self.tag_repository.get_user_tags(user_id)

    async def get_friend_tags(self, friend_id: str):
        ''' Дает теги повешенные пользователю. '''
        return await self.tag_repository.get_friend_tags(friend_id)

    async def create_tag(self, tag_name: str, user_id: str):
        ''' Создает тег. '''
        return await self.tag_repository.create_tag(tag_name, user_id)

    async def remove_tag(self, tag_id: int):
        ''' Удаляет тег. '''
        await self.tag_repository.remove_tag(tag_id)

    async def add_tag_on_friend(self):
        ''' Добавляет тег на друга. '''
        return await self.tag_repository.add_tag_on_friend()

    async def remove_tag_from_friend(self):
        ''' Удаляет тег с друга. '''
        return await self.tag_repository.remove_tag_from_friend()


friend_request_service = FriendRequestService()
friend_service = FriendService()
tags_service = TagsService()
