from logging import getLogger

from blank.repositories import BlankRepository
from blank.schemas import CreaetBlankDTO


logger = getLogger()


class BlankService:
    def __init__(self) -> None:
        self.blank_repository = BlankRepository()

    def _update_user_balance(slef):
        pass

    async def get_blank_change_lvl(self, match_id: int, user_number: int):
        blanks = await self.blank_repository.get_blanks_by_match(match_id)
        lvl_change = 0
        for blank in blanks:
            if user_number == 1:
                lvl_change += blank.user_1
            if user_number == 2:
                lvl_change += blank.user_2
            if user_number == 3:
                lvl_change += blank.user_3
            if user_number == 4:
                lvl_change += blank.user_4
        return lvl_change

    async def get_match_with_out_match(self, user_id: str):
        return await self.blank_repository.get_match_with_out_match(user_id)

    async def create_blank(self, create_blank_data: CreaetBlankDTO, user_id: str, match_id: int):
        return await self.blank_repository.create_blank(create_blank_data, user_id, match_id)


blank_service = BlankService()
