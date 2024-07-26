from tortoise.expressions import Q

from blank.models import Blank
from match.models import Match


class BlankRepository:
    def get_blanks_by_match(self):
        pass

    async def get_match_with_out_match(self, user_id: str):
        matches = await Match.filter(
            ~Q(blank_match__id__isnull=False),
            owner__telegram_user_id=user_id
        ).all()
        return matches

    def create_blank(slef):
        pass
