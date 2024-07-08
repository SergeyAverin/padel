from logging import getLogger

from fastapi import UploadFile

from account.repository import UserRepository, UserPhotoRepository
from account.schemas import UserDTO, UpdateUserDTO
from account.models import Hand, Position, User
from core.config.api_settings import api_setting


logger = getLogger()


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository
        self.photo_repository = UserPhotoRepository()

    async def create_user(self, user_data: UserDTO) -> User:
        user = await self.user_repository.create_user(user_data)
        return user

    async def get_user_by_telegram_user_id(self, telegram_id: str) -> User | None:
        user = await self.user_repository.get_user_by_telegram_user_id(telegram_id)
        return user

    async def update_user_by_user_id(self, telegram_user_id: str, new_user_data: UpdateUserDTO):
        return await self.user_repository.update_user_by_id(telegram_user_id, new_user_data)

    async def change_hand(self, user: UserDTO, new_hand: Hand) -> UserDTO:
        user.hand = new_hand
        return await self.user_repository.update_user_by_id(user.telegram_user_id, user)

    async def change_position(self, user: UserDTO, new_position: Position) -> UserDTO:
        user.position = new_position
        return await self.user_repository.update_user_by_id(user.telegram_user_id, user)

    async def upload_user_photo(self, user_id: str, photo: UploadFile):
        user = await user_service.get_user_by_telegram_user_id(user_id)
        await self.photo_repository.save_photo(user_id, photo)
        user.avatar = f"http://{api_setting.api_domain}/api/v1.0/user/image/{user_id}_{photo.filename}"
        await user.save()


user_service = UserService(UserRepository())
