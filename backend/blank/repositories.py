from tortoise.expressions import Q

from blank.models import Blank
from blank.schemas import CreaetBlankDTO
from match.models import Match
from account.service import user_service
from match.services import match_service


class BlankRepository:
    def get_blanks_by_match(self):
        pass

    async def get_match_with_out_match(self, user_id: str):
        matches = await Match.filter(
            ~Q(blank_match__id__isnull=False),
            owner__telegram_user_id=user_id
        ).all()
        return matches

    async def create_blank(slef, create_blank_data: CreaetBlankDTO, user_id: str, match_id: int):
        blank = Blank()
        match = await match_service.get_match_by_id(match_id)
        user = await user_service.get_user_by_telegram_user_id(user_id)
        blank.owner = user
        blank.match = match
        blank.user_1 = create_blank_data.user_1
        blank.user_2 = create_blank_data.user_2
        blank.user_3 = create_blank_data.user_3
        blank.user_4 = create_blank_data.user_4
        await blank.save()
        return blank
