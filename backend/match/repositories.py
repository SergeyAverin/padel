from datetime import datetime

from match.models import Match, StatusEnum
from match.schemas import MatchCreateDTO
from club.models import Club
from account.models import User


class MatchRepository:
    async def create_match(self, match_create_data: MatchCreateDTO, club: Club, user: User):
        match = Match()
        match.club = club
        match.start_at = match_create_data.start_at
        match.end_at = match_create_data.end_at
        match.created_at = datetime.now()
        match.owner = user
        await match.save()
        return match

    async def get_match_by_id(self, match_id: str):
        return await Match.get_or_none(id=match_id)

    def get_match_by_user(self):
        pass

    def get_match_by_club(self):
        pass

    def get_match_by_friends(self):
        pass

    def delete_match_by_id(self):
        pass


class MatchPlayersRepository:
    def get_match_players(self):
        pass

    def add_player_in_match(self):
        pass

    def remove_player_from_match(self):
        pass
