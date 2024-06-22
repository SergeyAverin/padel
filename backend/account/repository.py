from logging import getLogger

from account.models import User
from account.schemas import UserDTO


logger = getLogger()


class UserRepository:
    async def get_user_by_telegram_user_id(self, user_id) -> UserDTO | None:
        user = await User.get_or_none(telegram_user_id=user_id)
        if user:
            return UserDTO(
                age=user.age,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                telegram_user_id=user.telegram_user_id,
                username=user.username
            )

    async def create_user(self, user_data: UserDTO) -> UserDTO:
        user = User(
            age=user_data.age,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            telegram_user_id=user_data.telegram_user_id,
            username=user_data.username
        )
        await user.save()
        return user_data

    def update_user_by_id(self):
        pass
