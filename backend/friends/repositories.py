from logging import getLogger

from friends.models import FriendRequest, Tag
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
        return {"sender_user": sender_user,
                "recipient_user": recipient_user,
                "id": friend_request.id}

    async def get_friend_request_by_id(self, friend_request_id: int) -> None | FriendRequest:
        return await FriendRequest.get_or_none(id=friend_request_id)

    async def get_outer_friend_requests(self, telegram_user_id: str):
        friend_requests = await FriendRequest.filter(
            sender_user__telegram_user_id=telegram_user_id
        ).prefetch_related('sender_user', 'recipient_user')
        return [{"sender_user": m.sender_user,
                 "recipient_user": m.recipient_user,
                 "id": m.id} for m in friend_requests]

    async def get_inner_friend_requests(self, telegram_user_id: str):
        friend_requests = await FriendRequest.filter(
            recipient_user__telegram_user_id=telegram_user_id
        ).prefetch_related('sender_user', 'recipient_user')
        return [{"sender_user": m.sender_user,
                 "recipient_user": m.recipient_user,
                 "id": m.id} for m in friend_requests]

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

    async def get_friend_tags(self, friend_id: str):
        ''' Дает теги повешенные пользователю. '''
        return await Tag.filter(
            friends_with_tag__telegram_user_id=friend_id
        )

    async def create_tag(self, tag_name: str, user_id: str):
        ''' Создает тег. '''
        user = await user_service.get_user_by_telegram_user_id(user_id)
        tag = Tag()
        tag.name = tag_name
        tag.tag_owner = user
        await tag.save()
        return tag

    async def remove_tag(self, tag_id: int):
        ''' Удаляет тег. '''
        tag = await Tag.get_or_none(id=tag_id)
        if tag:
            await tag.delete()

    async def add_tag_on_friend(self, user_id: str, tag_id: int):
        ''' Добавляет тег на друга. '''
        user = await user_service.get_user_by_telegram_user_id(user_id)
        user_tags = await self.get_friend_tags(user_id)
        tag = await Tag.get_or_none(id=tag_id)
        if tag not in user_tags:
            await tag.friends_with_tag.add(user)
            await tag.save()

    async def remove_tag_from_friend(self, user_id: str, tag_id: int):
        ''' Удаляет тег с друга. '''
        user = await user_service.get_user_by_telegram_user_id(user_id)
        user_tags = await self.get_friend_tags(user_id)
        tag = await Tag.get_or_none(id=tag_id)
        if tag in user_tags:
            await tag.friends_with_tag.remove(user)
            await tag.save()
