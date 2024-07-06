from logging import getLogger

from account.models import User
from account.schemas import UserDTO, UpdateUserDTO


logger = getLogger()


class UserRepository:
    async def get_user_by_telegram_user_id(self, user_id: str) -> User | None:
        user = await User.get_or_none(telegram_user_id=user_id)
        return user

    async def create_user(self, user_data: UserDTO) -> User:
        user = User(
            username=user_data.username,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            telegram_user_id=user_data.telegram_user_id,
            age=user_data.age,
            hand=user_data.hand.value,
            position=user_data.position.value
        )
        await user.save()
        return user

    async def update_user_by_id(self, telegram_user_id: str, new_user_data: UpdateUserDTO):
        old_user = await User.get_or_none(telegram_user_id=telegram_user_id)
        old_user.age = new_user_data.age
        old_user.email = new_user_data.email
        old_user.first_name = new_user_data.first_name
        old_user.last_name = new_user_data.last_name
        old_user.username = new_user_data.username

        await old_user.save()
        return old_user
