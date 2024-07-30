from logging import getLogger

from fastapi import UploadFile

from account.models import User, UserStatus
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
            status=UserStatus.PLAYER.value,
            position=user_data.position.value,
            lvl=1
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
        old_user.city = new_user_data.city
        old_user.country = new_user_data.country

        await old_user.save()
        return old_user


class UserPhotoRepository:
    async def save_photo(self, user_id: str, content: UploadFile):
        with open(f'upload/users/{user_id}_{content.filename}', "wb") as f:
            contents = await content.read()
            f.write(contents)
