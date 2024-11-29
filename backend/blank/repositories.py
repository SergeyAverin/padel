from tortoise.expressions import Q

from blank.models import Blank
from blank.schemas import CreaetBlankDTO
from match.models import Match
from account.service import user_service
from match.services import match_service
from match.models import StatusEnum


class BlankRepository:
    def get_blanks_by_match(self, match_id: int):
        blanks = Blank.filter(match__id=match_id)
        return blanks

    def serealize_match(self, match):
        return {
            "club": match.club,
            "status": match.status,
            "start_at": match.start_at,
            "end_at": match.end_at,
            "created_at": match.created_at,
            "owner": match.owner,
            "user_1": match.user_1,
            "user_2": match.user_2,
            "user_3": match.user_3,
            "user_4": match.user_4,
            "selected_court": match.selected_court,
            "first_team_score": match.first_team_score,
            "second_team_score": match.second_team_score,
            "id": match.id
        }

    async def get_match_with_out_match(self, user_id: str):
        matches = await Match.filter(
            ~Q(blank_match__id__isnull=False),
            owner__telegram_user_id=user_id,
            status=StatusEnum.DONE
        ).prefetch_related('user_1', 'user_2', 'user_3', 'user_4', 'club', 'owner', 'selected_court').all()
        return [self.serealize_match(m) for m in matches]

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
