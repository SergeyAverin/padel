from account.repository import UserRepository
from account.schemas import UserDTO


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self.user_repository = user_repository

    def create_user(self):
        pass

    async def get_user_by_telegram_user_id(self, telegram_id: str) -> UserDTO | None:
        user = await self.user_repository.get_user_by_telegram_user_id(telegram_id)
        return user

    def update_user_by_user_id(self):
        pass


user_service = UserService(UserRepository())
