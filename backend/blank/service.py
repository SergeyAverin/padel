from blank.repositories import BlankRepository
from blank.schemas import CreaetBlankDTO


class BlankService:
    def __init__(self) -> None:
        self.blank_repository = BlankRepository()

    def _update_user_balance(slef):
        pass

    async def get_match_with_out_match(self, user_id: str):
        return await self.blank_repository.get_match_with_out_match(user_id)

    async def create_blank(self, create_blank_data: CreaetBlankDTO, user_id: str, match_id: int):
        return await self.blank_repository.create_blank(create_blank_data, user_id, match_id)


blank_service = BlankService()
