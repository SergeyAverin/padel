from account.repository import UserRepository
from account.schemas import UserDTO


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    async def create_user(self, user_data: UserDTO) -> UserDTO:
        user = await self.user_repository.create_user(user_data)
        return user

    async def get_user_by_telegram_user_id(self, telegram_id: str) -> UserDTO | None:
        user = await self.user_repository.get_user_by_telegram_user_id(telegram_id)
        return user

    async def update_user_by_user_id(self, telegram_user_id: str, new_user_data: UserDTO):
        return await self.user_repository.update_user_by_id(telegram_user_id, new_user_data)


user_service = UserService(UserRepository())
