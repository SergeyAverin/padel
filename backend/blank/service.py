from logging import getLogger

from blank.repositories import BlankRepository
from blank.schemas import CreaetBlankDTO
from account.models import User
from account.service import user_service
from match.models import Match
from match.services import match_service


logger = getLogger()


class BlankService:
    def __init__(self) -> None:
        self.blank_repository = BlankRepository()

    async def _get_user_number(self, match_id: int, user: User):
        match = await match_service.get_match_by_id(match_id)

        user_1 = 0
        user_2 = 0
        user_3 = 0
        user_4 = 0

        if user:
            if match.user_1:
                user_1 = await match.user_1.values()
            if match.user_2:
                user_2 = await match.user_2.values()
            if match.user_3:
                user_3 = await match.user_3.values()
            if match.user_4:
                user_4 = await match.user_4.values()

            logger.debug(user)
            logger.debug(user_2)

            if user_1 != 0 and user_1['id'] == user.id:
                return 1
            elif user_2 != 0 and user_2['id'] == user.id:
                return 2
            elif user_3 != 0 and user_3['id'] == user.id:
                return 3
            elif user_4 != 0 and user_4['id'] == user.id:
                return 4
        return 0

    async def _update_user_balance(self, user, match_id: str):
        if user:
            logger.debug('--user')
            tg_id = str(user)
            logger.debug(tg_id)
            logger.debug(type(tg_id))

            user_from_db = await user_service.get_user_by_telegram_user_id(tg_id)
            user_numver = await self._get_user_number(match_id, user_from_db)
            logger.debug('user_numver')
            logger.debug(user_numver)
            if user_numver > 10:
                user_numver = 10
            if user_numver < 0:
                user_numver = 0
            if user_numver != 0:
                user_from_db.lvl = await self.get_blank_change_lvl(
                    match_id,
                    user_numver
                )
                await user_from_db.save()

    async def get_blank_change_lvl(self, match_id: int, user: User):
        user_number = await self._get_user_number(match_id, user)
        lvl_change = 0
        if user_number != 0:
            blanks = await self.blank_repository.get_blanks_by_match(match_id)
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
        blank = await self.blank_repository.create_blank(create_blank_data, user_id, match_id)
        match = await match_service.get_match_by_id(match_id)
        logger.debug(match.user_1)
        await self._update_user_balance(match.user_1, match_id)
        await self._update_user_balance(match.user_2, match_id)
        await self._update_user_balance(match.user_3, match_id)
        await self._update_user_balance(match.user_4, match_id)
        return blank


blank_service = BlankService()
