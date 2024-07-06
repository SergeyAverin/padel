from logging import getLogger

from friends.models import FriendRequest, Tag
from account.models import User
from account.service import user_service


logger = getLogger()


class FriendRequestRepository:
    async def create_friend_request(self, sender_user_id: str, recipient_user_id: str):
        sender_user = await user_service.get_user_by_telegram_user_id(sender_user_id)
        recipient_user = await user_service.get_user_by_telegram_user_id(recipient_user_id)
        logger.debug(sender_user)
        logger.debug(recipient_user)
        friend_request = FriendRequest(
            sender_user=sender_user,
            recipient_user=recipient_user
        )
        await friend_request.save()
        return friend_request

    async def get_friend_request_by_id(self, friend_request_id: int) -> None | FriendRequest:
        return await FriendRequest.get_or_none(id=friend_request_id)

    async def get_friends_requests_by_user(self, telegram_user_id: str):
        friend_requests = await FriendRequest.filter(
            sender_user__telegram_user_id=telegram_user_id
        )
        # ToDo: добавить то где получатель
        return friend_requests

    async def delete_friend_request(self, friend_request_id: int):
        friend_request = await self.get_friend_request_by_id(friend_request_id)
        await friend_request.delete()


class FriendRepository:
    async def add_friend(self, sender_user_id: str, recipient_user_id: str):
        sender_user = await user_service.get_user_by_telegram_user_id(sender_user_id)
        recipient_user = await user_service.get_user_by_telegram_user_id(recipient_user_id)

        await sender_user.friends.add(recipient_user)
        await recipient_user.friends.add(sender_user)

        await sender_user.save()

    async def remove_friend(self, sender_user_id: str, recipient_user_id: str):
        sender_user = await user_service.get_user_by_telegram_user_id(sender_user_id)
        recipient_user = await user_service.get_user_by_telegram_user_id(recipient_user_id)

        await sender_user.friends.remove(recipient_user)
        await recipient_user.friends.remove(sender_user)

        await sender_user.save()


class TagRepository:
    async def get_user_tags(self, user_id: str):
        ''' Дает теги которые принадлежат пользователю. '''
        return await Tag.filter(tag_owner__telegram_user_id=user_id)

    def get_friend_tags(self):
        ''' Дает теги повешенные пользователю. '''
        pass

    async def create_tag(self, tag_name: str, user_id: str):
        ''' Создает тег. '''
        user = await user_service.get_user_by_telegram_user_id(user_id)
        tag = Tag()
        tag.name = tag_name
        tag.tag_owner = user
        await tag.save()
        return tag

    def remove_tag(self):
        ''' Удаляет тег. '''
        pass

    def add_tag_on_friend(self):
        ''' Добавляет тег на друга. '''
        pass

    def remove_tag_from_friend(self):
        ''' Удаляет тег с друга. '''
        pass
