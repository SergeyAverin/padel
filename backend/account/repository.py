from logging import getLogger

from account.models import User
from account.schemas import UserDTO


logger = getLogger()


class UserRepository:
    async def get_user_by_telegram_user_id(self, user_id: str) -> UserDTO | None:
        user = await User.get_or_none(telegram_user_id=user_id)
        if user:
            return UserDTO(
                age=user.age,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                telegram_user_id=user.telegram_user_id,
                username=user.username,
                hand=user.hand.value,
                position=user.position.value
            )

    async def create_user(self, user_data: UserDTO) -> UserDTO:
        user = User(
            age=user_data.age,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            telegram_user_id=user_data.telegram_user_id,
            username=user_data.username,
            hand=user_data.hand.value,
            position=user_data.position.value
        )
        await user.save()
        return user_data

    async def update_user_by_id(self, telegram_user_id: str, new_user_data: UserDTO):
        old_user = await User.get_or_none(telegram_user_id=telegram_user_id)
        old_user.age = new_user_data.age
        old_user.email = new_user_data.email
        old_user.first_name = new_user_data.first_name
        old_user.last_name = new_user_data.last_name
        old_user.telegram_user_id = new_user_data.telegram_user_id
        old_user.username = new_user_data.username
        old_user.position = new_user_data.position.value
        old_user.hand = new_user_data.hand.value
        await old_user.save()
        return UserDTO(
            age=old_user.age,
            email=old_user.email,
            first_name=old_user.first_name,
            last_name=old_user.last_name,
            telegram_user_id=old_user.telegram_user_id,
            username=old_user.username,
            hand=old_user.hand,
            position=old_user.position
        )
